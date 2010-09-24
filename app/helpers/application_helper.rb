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
    url = "#{url}?target=stats&amp;chart=#{chart}&amp;flash=#{'%i'% Time.now}"
    url += "&amp;start=#{start}" unless start.nil?
    url += "&amp;finish=#{finish}" unless finish.nil?

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

  def display_messages
    message = ''
    unless flash[:notice].empty?
      message += "<div class='success'>#{flash[:notice]}</div>"
    end
    unless session[:notice].empty?
      message += "<div class='success'>#{session[:notice]}</div>"
    end
    unless flash[:alert].empty?
      message += "<div class='error'>#{flash[:alert]}</div>"
    end
    unless session[:alert].empty?
      message += "<div class='error'>#{session[:alert]}</div>"
    end
    session[:notice] = session[:alert] = ''
    flash[:notice] = flash[:alert] = ''

    message.html_safe
  end

  def showgrid(display = true)
    content_for(:add_classes_to_container) {
      display ? 'showgrid' : ''
    }
  end

  def link_to_page_asset(name, f, association)
    #    This may be used in case different models are used.
    #    We use only one model - Asset
    #    new_object = f.object.class.reflect_on_association(:assets).klass.new

    fields = f.fields_for(:assets, Asset.new, :child_index => 'new_asset') do |f_res|
      render("#{association.to_s.singularize}_fields", :f_res => f_res, :name => name)
    end

    link_to_function(name, "add_page_asset('#{name}', \"#{escape_javascript(fields)}\")")
  end

  def pagination_info(collection, options = {})
    entry_name = options[:entry_name] || (collection.empty?? 'entry' :
        collection.first.class.name.underscore.gsub('_', ' '))

    plural_name = if options[:plural_name]
      options[:plural_name]
    elsif entry_name == 'entry'
      plural_name = 'entries'
    elsif entry_name.respond_to? :pluralize
      plural_name = entry_name.pluralize
    else
      entry_name + 's'
    end

    unless options[:html] == false
      b  = '<b>'
      eb = '</b>'
      sp = '&nbsp;'
    else
      b  = eb = ''
      sp = ' '
    end

    if collection.total_pages < 2
      case collection.size
      when 0; "No #{plural_name} found"
      when 1; "Displaying #{b}1#{eb} #{entry_name}"
      else;   "Displaying #{b}all #{collection.size}#{eb} #{plural_name}"
      end
    else
      %{Displaying #{plural_name} #{b}%d#{sp}-#{sp}%d#{eb} of #{b}%d#{eb} in total} % [
        collection.offset + 1,
        collection.offset + collection.length,
        collection.total_entries
      ]
    end.html_safe
  end
end
