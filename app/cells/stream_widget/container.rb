module StreamWidget
  class Container < Apotomo::Widget
    include ActionView::Helpers::JavaScriptHelper
    responds_to_event :update_presets, :with => :process_request

    has_widgets do |me|
      me << widget('stream_widget/schedule', 'schedule', :display, :stream_preset_id => ((param :stream_preset_id) || params[:stream_preset_id]))
      me << widget('stream_widget/sketches', 'sketches', :display, :stream_preset_id => ((param :stream_preset_id) || params[:stream_preset_id]))
      me << widget('stream_widget/questions', 'questions', :display, :current_user => (param :current_user), :stream_preset_id => ((param :stream_preset_id) || params[:stream_preset_id]))
    end

    def display
      stream_preset_id = param :stream_preset_id
      @stream_preset = current_preset(stream_preset_id)
      @show_tabs = @stream_preset.show_questions || @stream_preset.show_sketches || @stream_preset.show_schedule
      @show_support = @stream_preset.show_support
      @languages = @stream_preset.stream_items.map(&:language_id).uniq
      @current_user = param :current_user
      render
    end

    def process_request
      @stream_preset = current_preset(params[:stream_preset_id])
      unless @stream_preset
        # Unable to find preset id (maybe due to old session)- try to reload page
        render :text => 'window.location.reload();', :content_type => Mime::JS
        return
      end

      languages = @stream_preset.stream_items.map(&:language_id).uniq
      @presets = get_presets(@stream_preset, languages)
      result = render_to_string
      url = URI.parse url_for_event(:update_presets)
      query = "#{url.query}&stream_preset_id=#{@stream_preset.id}"
      key = "#{url.path}?#{query}"
      Cache.write(key, result, :expires_in => 5.minutes, :raw => true)
      render :text => result, :content_type => Mime::JS
    end

    def get_presets(stream_preset, languages)
      presets = {}
      languages.each { |language_id|
        items = stream_preset.stream_items.select { |item|
          item.language_id == language_id && !item.description.empty? && !item.stream_url.empty?
        }
        options_list = []
        image = ''
        items.each { |item|
          options_list << "<option #{"selected='selected'".html_safe if item.is_default} value='#{item.stream_url}'>#{item.description}</option>"
          image_path = item.stream_preset.inactive_image(item.language_id)
          image = "<img src='#{image_path.try(:filename)}' alt='#{I18n.t 'kabtv.kabtv.no_broadcast'}' />" if image_path
        }
        presets[language_id] = {:options => options_list.join(','), :image => image}
      }

      presets
    end
  end
end
