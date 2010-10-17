class StreamController < ApplicationController

  respond_to :js, :html

  before_filter :set_accept_header
  
  ITEMS_PER_PAGE = 10
  
  # Accepts the following:
  # stream/assignments
  # stream/assignments/new = :klass/:item(/:modifier)
  def index
    @stream_filter ||= params[:stream_filter]
    @modifier ||= params[:modifier]

    @language_id = Language.get_id_by_locale(I18n.locale)
    @is_new = @modifier == 'new'
    @user_confirmation_date = current_user.confirmed_at

    if @stream_filter == 'tag'
      @stream_header = "Tag: #{@modifier}"
      @stream_subclass = "by tag"
      @pages =  Page.tagged_with(@modifier).by_page_type(@stream_filter, @language_id, @user_confirmation_date).ordered
    else
      @stream_header = @stream_filter.humanize.pluralize
      @stream_subclass = @stream_header.singularize.downcase
      @pages =  Page.by_page_type(@stream_filter, @language_id, @user_confirmation_date).ordered
    end
    count = @pages.count
    @skip_pages = params[:skip_pages].to_i
    @pages = Page.find_by_sql(@pages.limit(ITEMS_PER_PAGE).skip(@skip_pages).to_sql)
    @skip_pages += ITEMS_PER_PAGE
    @has_more_items = count > @skip_pages
    @tags = Page.all_tags(I18n.locale)

    @profile = current_user

    @feed = FeedReader::Basic.new(I18n.t('home.views.feed')).feed
    
    respond_with @pages
  end


  private
  def set_accept_header
    return unless request.env['HTTP_USER_AGENT'] =~ /MSIE /

    unless request.xhr?
      request.env["HTTP_ACCEPT"] = 'application/xml,application/xhtml+xml,text/html;q=0.9'
      request.env["action_dispatch.request.formats"] = [ Mime::Type.new('text/html', :html) ]
    end
  end
end
