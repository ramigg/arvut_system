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
      render('admin/pages/questions/' + subklass, :f => builder)
    end
    style = (f.object.respond_to?("other") && f.object.other) && hide_onclick ? 'display:none;' : ''
    link_to_function(name, "add_fields(this, \"#{association}\", \"#{escape_javascript(fields)}\", #{hide_onclick})", :style => style)
  end

  def is_rtl?
    I18n.locale == :he
  end
  
  def ckeditor_toolbar(klass = 'Min')
    is_rtl? ? "#{klass}_he" : klass
  end

  def statistics(url, div_id, chart, width, height, start = nil, finish = nil)
    url = "#{url}?target=#{div_id}&amp;chart=#{chart}&amp;flash=#{'%i'% Time.now}&amp;w=#{width}&amp;h=#{height}"
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

  def link_to_page_asset(name, f, association, subclass = nil)
    #    This may be used in case different models are used.
    #    We use only one model - Asset
    #    new_object = f.object.class.reflect_on_association(:assets).klass.new

    fields = f.fields_for(:assets, Asset.new, :child_index => 'new_asset') do |f_res|
      render("#{association.to_s.singularize}_fields", :f_res => f_res, :name => name, :subclass => subclass)
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
  
# *objectTags* - Array of tags already available for the page
# *allTagsUrl* - URL to the all available tags that can be added to the page
  def page_tags(objectTags, allTagsUrl, locale = 'en')
    %{
        <div id="tags"></div>
        <script type="text/javascript">
          $(document).ready(function(){
            $("#tags").tagit({
              objectTags: #{objectTags.to_json},
              allTags : "#{allTagsUrl}",
              locale : "#{locale}"
            });
          });
        </script>
    }.html_safe
  end
  
  def post_url(page)
    if page.page_type == 'event'
      event_url(page)
    else
      page_url(page)
    end
  end
  
  def post_link_class(page)
    if Rails.configuration.open_stream_in_popup && page.page_type != 'event'
      'in-iframe'
    else
      'data-remote' # will be parsed by javascript for bookmark URL's
    end
  end

  def sortable_admin(title, column)
    css_class = (column == sort_column) ? "current #{sort_direction}" : nil
    direction = (column == sort_column && sort_direction == 'asc') ? 'desc' : 'asc'
    page_no = params[:page_no] || 1
    per_page = params[:per_page] || Page.per_page
    link_to title, params.merge(:sort => column, :direction => direction, :per_page => per_page, :page_no => page_no), {:class => css_class}
  end

  def pages_menu_count_and_style(stream_filter)
    if stream_filter == 'bookmarks'
      count = Page.favorite_pages(Language.get_id_by_locale(I18n.locale), current_user.date_to_show_pages_from, current_user).count
    else
      count = Page.new_pages_by_page_type(stream_filter, Language.get_id_by_locale(I18n.locale), current_user.date_to_show_pages_from, current_user.id).count
    end
    count > 0 ? [" (#{count})", ''] : ['', 'read']
  end
  
  def is_answered_css(page)
    return '' unless page.page_type == 'assignment'
    if page.is_answered?(current_user)
      'assignment-icon-old'
    else
      'assignment-icon-new'
    end
  end
  def is_read_css(page)
    if page.is_read?(current_user)
      'read-page'
    else
      ''
    end
  end
  def is_bookmark_css(page)
    if page.is_bookmarked?(current_user)
      'bookmark-icon'
    else
      'bookmark-icon-empty'
    end
  end
  def toggle_is_read_name(page)
    if page.is_read?(current_user)
      "#{I18n.t("stream.mark_as")} #{I18n.t("stream.unread")}"
    else
      "#{I18n.t("stream.mark_as")} #{I18n.t("stream.read")}"
    end
  end
  def toggle_is_bookmark_name(page)
    if page.is_bookmarked?(current_user)
      "#{I18n.t("stream.remove_from_favorites")}"
    else
      "#{I18n.t("stream.add_to_favorites")}"
    end
  end
  
end
