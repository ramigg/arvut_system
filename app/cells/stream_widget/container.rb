module StreamWidget
  class Container < Apotomo::Widget
    include ActionView::Helpers::JavaScriptHelper
    responds_to_event :update_presets, :with => :process_request
    responds_to_event :complain, :with => :store_complain

    has_widgets do |me|
      me << widget('stream_widget/schedule', 'schedule', :display)
      me << widget('stream_widget/sketches', 'sketches', :display)
      me << widget('stream_widget/questions', 'questions', :display, :current_user => (param :current_user))
    end

    def display
      set_current_preset
      @stream_preset = current_preset
      @show_tabs = @stream_preset.show_questions || @stream_preset.show_sketches || @stream_preset.show_schedule
      @show_support = @stream_preset.show_support
      @current_user = param :current_user
      @user_complain = UserComplain.new(:user => @current_user)
      render
    end

    def store_complain
      @complain = UserComplain.new(param :user_complain)
      if @complain.save
        email = Mailer.send_problem_notification @complain
        email.deliver
        render :text => "alert('#{I18n.t "kabtv.kabtv.thank_you"}');$('#user_complain_message').val('')", :content_type => Mime::JS
      else
        render :text => "alert('#{I18n.t "kabtv.kabtv.submit_problem"}');", :content_type => Mime::JS
      end
    end

    def process_request
      @stream_preset = current_preset
      timestamp = param :timestamp
      if @stream_preset.updated_at.to_s == timestamp
        render :text => '', :content_type => Mime::JS
        return
      end

      @language = Language.find_by_locale params[:locale]

      # look for channel
      preset_languages = @stream_preset.preset_languages.select { |pl| pl.language.id = @language.id }
      stream_items = preset_languages.collect { |pl| pl.stream_items }.flatten
      @reload_player = !stream_items.map(&:stream_url).include?(params[:stream_url])
      current_item = stream_items.select { |p| p.stream_url == params[:stream_url] }

      @presets, @languages = get_presets(current_item, params[:wmv] == 'true', params[:flash] == 'true')
      render
    end

    # Returns:
    # - list of languages
    # - list of technologies per language
    # - list of qualities per technology per language
    def get_presets(current_item, has_wmv, has_flash, has_cdn = false)
      presets = {}
      languages = []
      preset_languages = @stream_preset.preset_languages
      language_ids = preset_languages.map(&:language_id).uniq
      wmv_id = Technology.find_by_name('WMV').id
      flash_id = Technology.find_by_name('Flash').id

      # for each language create list of technologies
      language_ids.each { |language_id|
        languages << "<option #{"selected='selected'".html_safe if language_id == @language.id} value='#{language_id}'>#{Language.find(language_id).language}</option>"
        options_list = []
        image = ''
        presets[language_id] ||= {}
        technologies = {}
        preset_languages.select { |pl| pl.language_id == language_id }.collect { |l| l.stream_items }.flatten.reject { |si| si.stream_url.empty? }.each { |item|
          tech_id = item.technology.id
          next if (!has_wmv && tech_id == wmv_id) || (!has_flash && tech_id == flash_id)
          presets[language_id][tech_id] ||= ''
          if (!current_item.empty? && current_item[0].preset_language.language_id == language_id)
            # this language
            is_default = current_item[0].stream_url == item.stream_url
          else
            is_default = item.is_default
          end
          if technologies[tech_id].nil?
            options_list << "<input type='radio' name='technology_id' #{"checked='checked'".html_safe if is_default} value='#{tech_id}'/><span>#{item.technology.name}</span><br/>"
            technologies[tech_id] = 1
          elsif is_default
            # reset technology to ensure it is default
            options_list.delete_if {|x| /#{item.technology.name}/.match x}
            options_list << "<input type='radio' name='technology_id' #{"checked='checked'".html_safe if is_default} value='#{tech_id}'/><span>#{item.technology.name}</span><br/>"
          end
          image_path = item.preset_language.stream_preset.stream_state.inactive_image(language_id)
          image = "<img src='#{image_path.try(:filename)}' alt='#{I18n.t 'kabtv.kabtv.no_broadcast'}' />" if image_path
          presets[language_id][tech_id] += "<option #{"selected='selected'".html_safe if is_default} value='#{item.stream_url}'>#{item.quality.name}</option>"
        }
        presets[language_id][:options] = options_list.uniq.compact.join
        presets[language_id][:image] = image
      }

      [presets, languages.join(',')]
    end
  end
end
