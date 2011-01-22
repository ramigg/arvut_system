class PagesAdmin < Apotomo::Widget
  helper ApplicationHelper
  
  responds_to_event :submit, :with => :process_form

  def display_form
    lang_id = Language.get_id_by_locale(params[:language] || I18n.locale)
    page_type = 'message'
    @page = Page.new(:language_id => lang_id, :author_id => current_user.id,
      :status => 'PUBLISHED', :page_type => page_type)
    render
  end
  
  def process_form
    debugger
    return
    @page = Page.new(params[:page])
    @page.assets.sort! { |a, b| a.position <=> b.position } if @page.assets

    if @page.save
      flash[:notice] = I18n.t 'admin.pages.success'
    end
  end

  
  private
  
  def current_user
    @current_user ||= param :current_user
  end
  

end