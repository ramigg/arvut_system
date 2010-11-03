module StreamWidget
  module StreamHelper
    include ActionView::Helpers::JavaScriptHelper
    include ActionView::Helpers::TagHelper
    def link_to_remove_fields(name, f)
      is_new_record = f.object.new_record?
      record_type = is_new_record ? 'true' : 'false'
      f.hidden_field(:_destroy, :value => '0') + link_to_function(name, "remove_field(this, #{record_type})")
    end

    def link_to_add_fields(func_name, f, association)
      new_object = f.object.class.reflect_on_association(association).klass.new
      fields = f.fields_for(association, new_object, :child_index => "new_#{association}") do |builder|
        render(:view => '_stream_items', :locals => {:stream_items => builder})
      end
      link_to_function(func_name, "add_field(this, \"#{association}\", \"#{escape_javascript(fields)}\")")
      
      
      
    end
  end
end
