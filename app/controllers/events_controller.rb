class EventsController < ApplicationController
  layout 'stream'
  respond_to :html, :js
  
  def show
    @page = Page.find(params[:id])
    
    
    use_widgets do |event|
      event << widget('stream_widget/admin', 'stream_admin', :display_form, :stream_preset => @page.stream_preset)
    end
    
    respond_with @page
  end

end
