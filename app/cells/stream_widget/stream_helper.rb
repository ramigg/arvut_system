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

    def link_to_add_fields(func_name, f, association)
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
    
    def set_current_preset(stream_id)
      session[:stream_preset_id] = stream_id
    end
    
    def current_preset
      return nil unless session[:stream_preset_id]
      StreamPreset.find(session[:stream_preset_id])
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
    
  end
end
