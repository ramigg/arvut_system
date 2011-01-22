class StreamController < ApplicationController

  respond_to :html, :js
  before_filter :adjust_format_for_ie8

  ITEMS_PER_PAGE = 10
  
  # Accepts the following:
  # stream/assignments
  # stream/assignments/new = :klass/:item(/:modifier)
  def index
    @stream_filter ||= params[:stream_filter]
    @modifier ||= params[:modifier]

    @language_id = Language.get_id_by_locale(I18n.locale)
    @is_tag = @stream_filter == 'tag'
    @is_rav = @stream_filter == 'rav'
    @is_bookmark = @stream_filter == 'bookmarks'
    @is_new = @modifier == 'new'

    if @is_tag
      @pages =  Page.tagged_with(@modifier).by_page_type(@stream_filter, @language_id, current_user.date_to_show_pages_from)
    elsif @is_rav
      rav = Page.get_tag_for_rav(:locale => I18n.locale)
      @stream_subclass = 'rav'
      if @is_new
        @pages =  Page.new_pages_by_page_type('tag', @language_id, current_user.date_to_show_pages_from, current_user.id)
      else
        @pages =  Page.by_page_type('tag', @language_id, current_user.date_to_show_pages_from)
      end
      @pages = @pages.tagged_with(rav)
    elsif @is_bookmark
      @pages =  Page.favorite_pages(@language_id, current_user.date_to_show_pages_from, current_user)
    else 
      @stream_header = @stream_filter.humanize.pluralize
      @stream_subclass = @stream_header.singularize.downcase
      if @is_new
        @pages =  Page.new_pages_by_page_type(@stream_filter, @language_id, current_user.date_to_show_pages_from, current_user.id)
      else
        @pages =  Page.by_page_type(@stream_filter, @language_id, current_user.date_to_show_pages_from)
      end
    end
    @pages = @stream_filter == 'all' ? @pages.ordered_all : @pages.ordered
    count = @pages.count
    @skip_pages = params[:skip_pages].to_i
    @pages = Page.find_by_sql(@pages.limit(ITEMS_PER_PAGE).skip(@skip_pages).to_sql)
    if @stream_filter == 'all'
      @sticky_pages = @pages.select{|p| p.is_sticky }
      @pages -= @sticky_pages
    end
    @skip_pages += ITEMS_PER_PAGE
    @has_more_items = count > @skip_pages
    @tags = Page.all_tags(I18n.locale)

    @profile = current_user

    respond_with @pages
  end
end
