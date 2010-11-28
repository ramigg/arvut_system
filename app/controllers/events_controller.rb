class EventsController < ApplicationController
  layout 'stream'
  respond_to :html, :js
  before_filter :adjust_format_for_ie8
  
  before_filter :set_stream_preset_id
  
  has_widgets do |event|
    event << widget('stream_widget/admin_container', 'stream_admin', :display)
    event << widget('stream_widget/container', 'stream_container', :display, :current_user => current_user)
  end
  def show
    @page ||= Page.find(params[:id])
    
    respond_with @page
  end
  
  private
  def set_stream_preset_id
    return unless params[:id]
    @page ||= Page.find(params[:id])
    session[:stream_preset_id] = @page.stream_preset if @page
  end

  def adjust_format_for_ie8
    request.format = :js if request.xhr? && request.env['HTTP_ACCEPT'] == '*/*' # IE8 problems
  end
end
