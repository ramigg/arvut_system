module ApplicationHelper
  
  def link_to_remove_fields(name, f)
    is_new_record = f.object.new_record?
    record_type = is_new_record ? 'true' : 'false'
    f.hidden_field(:_destroy, :value => '0') + link_to_function(name, "remove_fields(this, #{record_type})")
  end

  def link_to_add_fields(name, f, association, subklass = nil)
    hide_onclick = association == :other
    subklass ||= association.to_s.singularize
    new_object = f.object.class.reflect_on_association(association).klass.new
    fields = f.fields_for(association, new_object, :child_index => "new_#{association}") do |builder|
      render(subklass, :f => builder)
    end
    style = (f.object.respond_to?("other") && f.object.other) && hide_onclick ? 'display:none;' : ''
    link_to_function(name, "add_fields(this, \"#{association}\", \"#{escape_javascript(fields)}\", #{hide_onclick})", :style => style)
  end

  def user_has_access_to_admin?(user)
    return false unless user
    user.is_admin? || user.is_groupmanager? || user.is_moderator? || user.is_reports?
  end
  
  def is_rtl?
    I18n.default_locale == :he
  end
  
  def ckeditor_toolbar(klass = 'Min')
    is_rtl? ? "#{klass}_he" : klass
  end

  def statistics(url, div_id, chart, start = nil, finish = nil)
    url = "#{url}?target=stats&chart=#{chart}&flash=#{'%i'% Time.now}"
    url += "&start=#{start}" unless start.nil?
    url += "&finish=#{finish}" unless finish.nil?

    result = <<-JS
<script type="text/javascript">
  $(document).ready(function(){
    $.ajax({
      dataType: 'script',
      type: 'GET',
      url: '#{url}',
      success: function(data){
        eval(data);
      }
    });
  });
</script>
<div id="#{div_id}"></div>
    JS

    result.html_safe
  end
end
