class Admin::AdminTasksController < ApplicationController

  respond_to :html, :js
  
  before_filter :check_if_restricted

  autocomplete :user, :email, :add_also => [:first_name, :last_name], :full => true

  has_widgets do |event|
    event << widget('stream_widget/admin_container', 'stream_admin', :display, 
    :current_user => current_user)
    event << widget('stream_widget/container', 'stream_container', :display, 
    :current_user => current_user)
  end
  
  def remove_user_action
    @email = params[:email]
    unless @email.empty?
      user = User.where(:email => @email).first
      if user.nil?
        # Wrong email -- user doesn't exist
        session[:alert] = 'Wrong email'
      else
        if user.delete
          session[:notice] = 'Done'
        else
          session[:alert] = 'Unable to remove user'
        end
      end

      render :remove_user
    end
  end

  def clear_cache
    Rails.cache.clear
    render :text => 'Done'
  end
end
