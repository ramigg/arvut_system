module StreamWidget
  class Container < Apotomo::Widget
    include ActionView::Helpers::JavaScriptHelper
    responds_to_event :update_presets, :with => :process_request

    has_widgets do |me|
      me << widget('stream_widget/schedule', 'schedule', :display, :stream_preset_id => ((param :stream_preset_id) || params[:stream_preset_id]))
      me << widget('stream_widget/sketches', 'sketches', :display, :stream_preset_id => ((param :stream_preset_id) || params[:stream_preset_id]))
      me << widget('stream_widget/questions', 'questions', :display, :current_user => (param :current_user), :stream_preset_id => ((param :stream_preset_id) || params[:stream_preset_id]))
      me << widget('stream_widget/coveritlive', 'coveritlive', :display, :stream_preset_id => ((param :stream_preset_id) || params[:stream_preset_id]))
      me << widget('stream_widget/special_schedule', 'special_schedule', :display, :stream_preset_id => ((param :stream_preset_id) || params[:stream_preset_id]))
    end

    def display
      stream_preset_id = param :stream_preset_id
      @stream_preset   = current_preset(stream_preset_id)
      @show_tabs       = !!(@stream_preset.show_questions || @stream_preset.show_sketches || @stream_preset.show_schedule || @stream_preset.show_coveritlive || @stream_preset.show_special_schedule)
      @show_support    = @stream_preset.show_support
      @current_user    = param :current_user
      @user_complain   = UserComplain.new(:user => @current_user)
      @locale          = params[:locale]
      render
    end

    def process_request
      @stream_preset = current_preset(params[:stream_preset_id])
      unless @stream_preset
        # Unable to find preset id (maybe due to old session)- try to reload page
        render :text => 'window.location.reload();', :content_type => Mime::JS
        return
      end

      @language = Language.find_by_locale params[:locale]

      @presets, @languages = get_presets(params[:wmv] == 'true', params[:flash] == 'true')

      result = render_to_string
      url    = URI.parse url_for_event(:update_presets)
      query  = "#{url.query}&stream_preset_id=#{@stream_preset.id}"
      key    = "#{url.path}?#{query}"
      Cache.write(key, result, :expires_in => 15.seconds, :raw => true)
      render :text => result, :content_type => Mime::JS
    end

    # Returns:
    # - list of languages
    # - list of technologies per language
    # - list of qualities per technology per language
    def get_presets(has_wmv, has_flash)
      presets          = {}
      languages        = []
      preset_languages = @stream_preset.preset_languages
      language_ids     = preset_languages.map(&:language_id).uniq
      wmv_id           = Technology.find_by_name('WMV').id
      flash_id         = Technology.find_by_name('Flash').id

      # for each language create list of technologies
      language_ids.each { |language_id|
        languages << "<option #{"selected='selected'".html_safe if language_id == @language.id} value='#{language_id}'>#{Language.find(language_id).language}</option>"
        options_list         = []
        image                = ''
        presets[language_id] ||= {}
        technologies         = {}
        preset_languages.select { |pl| pl.language_id == language_id }.collect { |l| l.stream_items }.flatten.reject { |si| si.stream_url.empty? }.each { |item|
          tech_id = item.technology.id
          next if (!has_wmv && tech_id == wmv_id) || (!has_flash && tech_id == flash_id)
          presets[language_id][tech_id] ||= ''
          is_default                    = item.is_default
          if technologies[tech_id].nil?
            options_list << "<input type='radio' name='technology_id' #{"checked='checked'".html_safe if is_default} value='#{tech_id}'/><span>#{item.technology.name}</span><br/>"
            technologies[tech_id] = 1
          elsif is_default
            # reset technology to ensure it is default
            options_list.delete_if { |x| /#{item.technology.name}/.match x }
            options_list << "<input type='radio' name='technology_id' #{"checked='checked'".html_safe if is_default} value='#{tech_id}'/><span>#{item.technology.name}</span><br/>"
          end
          image_path                    = item.preset_language.stream_preset.stream_state.inactive_image(language_id)
          image                         = "<img src='#{image_path.try(:filename)}' alt='#{I18n.t 'kabtv.kabtv.no_broadcast'}' />" if image_path
          presets[language_id][tech_id] += "<option #{"selected='selected'".html_safe if is_default} value='#{item.stream_url}'>#{item.quality.name}</option>"
        }
        presets[language_id][:options] = options_list.uniq.compact.join
        presets[language_id][:image]   = image
      }

      [presets, languages.join(',')]
    end
  end
end
