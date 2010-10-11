module PagesHelper
  def pages_menu_count_and_style(stream_filter)
    count = Page.by_page_type(stream_filter, @language_id, @user_confirmation_date).count
    count > 0 ? [" (#{count})", ''] : ['', 'read']
  end
end
