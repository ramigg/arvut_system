module PagesHelper
  def pages_menu_count_and_style(stream_filter)
    count = Page.new_pages_by_page_type(stream_filter, @language_id, @user_confirmation_date, current_user.id).count
    # count = Page.by_page_type(stream_filter, @language_id, @user_confirmation_date).count
    count > 0 ? [" (#{count})", ''] : ['', 'read']
  end
  
  def is_answered_css(page)
    record = PageUserflag.where(:page_id => page.id, :user_id => current_user.id).first
    return '' unless page.page_type == 'assignment'
    if record && record.is_answered
      "assignment-icon-old"
    else
      "assignment-icon-new"
    end
  end
end
