class Admin::PagesController < ApplicationController

  before_filter :check_if_restricted
  layout 'pages'

  # Display all my tasks
  def index
    # Update number of items to show on page (if supplied)
    Page.per_page = params[:per_page].to_i if params[:per_page]

    @pages = Page.get_my_pages current_user, params[:page]
  end

  def new
    locale = I18n.default_locale || 'en'
    lang_id = Language.get_id_by_locale(locale)
    
    @page = Page.new(:language_id => lang_id, :author_id => current_user.id,
      :status => 'DRAFT', :page_type => params[:page_type])

    @view_mode = set_page_mode params[:page_type]
    redirect_to :action => "index" if @view_mode.nil?
  end

  def create
    @page = Page.new(params[:page])
    @page.assets.sort! { |a, b| a.position <=> b.position } if @page.assets

    set_page_status @page, params
    
    if @page.save
      flash[:notice] = 'Page was successfully created'
    else
      @view_mode = set_page_mode @page.page_type
    end
    respond_with(:admin, @page, :location => admin_pages_url)
  end

  def edit
    @page = Page.find(params[:id])

    @page.assets.sort! { |a, b| a.position <=> b.position } if @page.assets
    @view_mode = set_page_mode @page.page_type
    redirect_to :action => "index" if @view_mode.nil?
  end

  def update
    @page = Page.find(params[:id])

    set_page_status @page, params

    if @page.update_attributes(params[:page])
      flash[:notice] = 'Page was uccessfully updated'
    else
      @view_mode = set_page_mode @page.page_type
    end
    
    respond_with(:admin, @page, :location => admin_pages_url)
  end

  def destroy
    @page = Page.find(params[:id])
    @page.status = 'DELETED'
    if @page.save
      flash[:notice] = 'Page was successfully destroyed'
    else
      flash[:alert] = 'Page was NOT destroyed'
    end
    respond_with(@page, :location => admin_pages_url)
  end

  private

  def set_page_status object, options

    object.status = 'DRAFT' # Default value

    object.status = 'PUBLISH_AT' if options[:PUBLISH_AT]
    object.status = 'PUBLISHED' if options[:PUBLISH]
  end
  
  def set_page_mode(page_type)
    case page_type
    when 'assignment'
      'assignment'
    when 'message'
      'message'
    else
      session[:alert] = "Unknown type of page: #{page_type}"
      nil
    end
  end
end