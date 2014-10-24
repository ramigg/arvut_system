class EventsController < ApplicationController
  layout 'stream'
  respond_to :html, :js
  before_filter :adjust_format_for_ie8

  has_widgets do |event|
    event << widget('stream_widget/admin_container', 'stream_admin', :display,
    :current_user => current_user, :stream_preset_id => @page.try(:stream_preset_id))
    event << widget('stream_widget/container', 'stream_container', :display,
    :current_user => current_user, :stream_preset_id => @page.try(:stream_preset_id))
  end

  def show
    @page ||= Page.find(params[:id])

    unless current_user.is_archived_broadcasts?
      redirect_to home_url and return if SecretBroadcast::PAGES.include?(@page.id)
    end

    PageUserflag.add_flag(@page, current_user, :is_read)
    respond_with @page
  end

end
