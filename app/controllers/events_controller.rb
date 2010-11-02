class EventsController < ApplicationController
  layout 'stream'
  respond_to :html, :js
  
  has_widgets do |event|
    event << widget('stream_widget/admin', 'stream_admin', :display_form)
    event << widget('stream_widget/container', 'stream_container', :display, :current_user => current_user)
  end

  def show
    @page = Page.find(params[:id])
    
    respond_with @page
  end

end
