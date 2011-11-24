module StreamWidget
  module StreamHelper
    include ActionView::Helpers::JavaScriptHelper
    include ActionView::Helpers::TagHelper
    # include ActionView::Helpers::FormHelper
    def link_to_remove_fields(name, form)
      is_new_record = form.object.new_record?
      record_type = is_new_record ? 'true' : 'false'
      form.hidden_field(:_destroy, :value => '0') + link_to_function(name, "remove_field(this, #{record_type})")
    end

    def link_to_add_cell_fields(name, form, object, partial, where)
      html = form.fields_for "#{object.class.to_s.tableize}_attributes", object, :index => "index_to_replace_with_js" do |si|
        render :partial => partial, :locals => {:form => si}, :object => object
      end
      link_to_function name, %{
        var new_object_id = new Date().getTime();
        var html = jQuery(#{js html}.replace(/index_to_replace_with_js/g, new_object_id)).hide();
        html.insertBefore("#{where}").slideDown('slow')
      }
    end

    def js(data)
      if data.respond_to? :to_json
        data.to_json
      else
        data.inspect.to_json
      end
    end

    def link_to_add_images(func_name, association)
      new_object = StreamImage.new
      fields = yield(new_object, association)
      link_to_function(func_name, "add_image_field(this, \"#{association}\", \"#{escape_javascript(fields)}\")")
    end

    def set_current_preset
      session[:stream_preset_id] = param :stream_preset_id rescue nil
    end

    def current_preset(preset_id = 0)
      if session[:stream_preset_id] and (preset_id == 0 || preset_id.nil?)
        preset_id = session[:stream_preset_id]
      elsif preset_id == 0 || preset_id.nil?
        return nil
      end
      @current_preset ||= StreamPreset.find(preset_id)
    end

    def set_admin_display_mode(mode)
      session[:admin_display_mode] = mode
    end

    def admin_display_mode
      session[:admin_display_mode]
    end

    def stream_state_css(stream_preset)
      if stream_preset.is_active?
        "color:green;"
      else
        "color:red;"
      end
    end

    def current_user
      @current_user ||= param :current_user
    end

    def set_push_to_commet_flag (flag)
      session["is_push_to_commet"] = flag
    end

    def get_push_to_commet_flag
      session["is_push_to_commet"]
    end

  end
end
