class EventsController < ApplicationController
  layout 'stream'
  respond_to :html, :js

  def show
    @page = Page.find(params[:id])
    respond_with @page
  end

end
