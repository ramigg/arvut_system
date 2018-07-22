class EventsController < ApplicationController
  layout 'stream'
  respond_to :html, :js
  before_filter :adjust_format_for_ie8

  has_widgets do |event|
    event << widget('stream_widget/admin_container', 'stream_admin', :display, :current_user => current_user, :stream_preset_id => @page.try(:stream_preset_id))
    event << widget('stream_widget/container', 'stream_container', :display, :current_user => current_user, :stream_preset_id => @page.try(:stream_preset_id))
    event << widget('stream_widget/webrtc', 'webrtc_container', :display, :current_user => current_user, :stream_preset_id => @page.try(:stream_preset_id))
    event << widget('stream_widget/webrtc4', 'webrtc4_container', :display, :current_user => current_user, :stream_preset_id => @page.try(:stream_preset_id))
  end

  def show
    @page ||= Page.find(params[:id])

    PageUserflag.add_flag(@page, current_user, :is_read)
    respond_with @page
  end

end
