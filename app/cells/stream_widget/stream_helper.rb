module StreamWidget
  module StreamHelper
    include ActionView::Helpers::JavaScriptHelper
    include ActionView::Helpers::TagHelper
    # include ActionView::Helpers::FormHelper
    def link_to_remove_fields(name, f)
      is_new_record = f.object.new_record?
      record_type = is_new_record ? 'true' : 'false'
      f.hidden_field(:_destroy, :value => '0') + link_to_function(name, "remove_field(this, #{record_type})")
    end

    def link_to_add_cell_fields(func_name, f, association)
      new_object = f.object.class.reflect_on_association(association).klass.new
      fields = f.fields_for(association, new_object, :child_index => "new_#{association}") do |builder|
        render(:view => "_#{association.to_s}", :locals => {association => builder})
      end
      link_to_function(func_name, "add_field(this, \"#{association}\", \"#{escape_javascript(fields)}\")")
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
        preset_id = 2
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
