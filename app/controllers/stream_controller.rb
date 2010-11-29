class StreamController < ApplicationController

  respond_to :html, :js

  ITEMS_PER_PAGE = 10
  
  # Accepts the following:
  # stream/assignments
  # stream/assignments/new = :klass/:item(/:modifier)
  def index
    @stream_filter ||= params[:stream_filter]
    @modifier ||= params[:modifier]

    @language_id = Language.get_id_by_locale(I18n.locale)
    @is_new = @modifier == 'new'

    if @stream_filter == 'tag'
      @stream_header = "Tag: #{@modifier}"
      @stream_subclass = "by tag"
      @pages =  Page.tagged_with(@modifier).by_page_type(@stream_filter, @language_id, current_user.date_to_show_pages_from)
    else
      @stream_header = @stream_filter.humanize.pluralize
      @stream_subclass = @stream_header.singularize.downcase
      @pages =  Page.by_page_type(@stream_filter, @language_id, current_user.date_to_show_pages_from)
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
