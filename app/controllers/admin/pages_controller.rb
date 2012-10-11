class Admin::PagesController < ApplicationController

  respond_to :html, :js

  before_filter :check_if_restricted
  layout 'admin_pages'

  helper_method :sort_column, :sort_direction

  # Display all my tasks
  def index
    if params.count <= 3 && cookies['st_admin_setup']
      CGI.parse(cookies['st_admin_setup']).each{|x|
        name = x[0]
        value = x[1][0]
        params[name] = value
      }
    end
    # Update number of items to show on page (if supplied)
    Page.per_page = params[:per_page].to_i if params[:per_page]
    Page.per_page = 10 if Page.per_page <= 0

    @authors = Page.select('DISTINCT(author_id)')

    @pages = Page.get_my_pages :user => current_user,
      :page_no => params[:page] || 1,
      :locale => I18n.locale,
      :sort => ("#{sort_column} #{sort_direction}"),
      :search => params[:search],
      :flocale => params[:flocale],
      :filter => {:status => params[:status], :page_type => params[:page_type], :author => params[:author]}
  end

  def new
    lang_id = Language.get_id_by_locale(params[:language] || I18n.locale)
    
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
      flash[:notice] = I18n.t 'admin.pages.success'
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

    tag_list = "#{@page.locale}_tag_list"
    params[:page][tag_list] = [] if params[:page][tag_list].nil?
    
    if @page.update_attributes(params[:page])
      flash[:notice] = I18n.t 'admin.pages.update'
    else
      @view_mode = set_page_mode @page.page_type
    end
    
    respond_with(:admin, @page, :location => admin_pages_url)
  end

  def tag_list
    respond_with do |format|
      format.js{render :text => Page.all_tags_strings(params[:tag_list_locale]).to_json}
    end
    return
  end

  def destroy
    @page = Page.find(params[:id])
    @page.status = 'DELETED'
    if @page.save(:validate => false)
      flash[:notice] = I18n.t 'admin.pages.destroy'
    else
      flash[:notice] = I18n.t 'admin.pages.destroy_failure'
    end
    respond_with(@page, :location => admin_pages_url)
  end

  private

  def sort_column
    Page.column_names.include?(params[:sort]) ?  params[:sort] : '"pages".updated_at DESC, "pages".publish_at DESC'
  end

  def sort_direction
    %w[asc desc ].include?(params[:direction]) ? params[:direction] : ''
  end

  def set_page_status(object, options)

    if options[:PUBLISH_AT]
      object.status = 'PUBLISHED'
    elsif options[:PUBLISH]
      object.status = 'PUBLISHED'
      object.publish_at = Time.zone.now
    else
      object.status = 'DRAFT' # Default value
      object.publish_at = nil
    end
  end
  
  def set_page_mode(page_type)
    case page_type
    when 'assignment'
      'assignment'
    when 'event'
      'event'
    when 'message'
      'message'
    when 'article', 'project' ,'button_content'
      'article'
    else
      session[:alert] = I18n.t 'admin.pages.unknown_page', :page_type => page_type
      nil
    end
  end
end
