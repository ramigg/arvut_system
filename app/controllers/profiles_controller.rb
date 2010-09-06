class ProfilesController < ApplicationController
  respond_to :html

  def edit
    @user = current_user
  end

  def update
    # 1. Validation of required fields
    user = current_user
    User::PROFILE_FIELDS.each{|field|
      id = field[:id]
      user[id] = params[id]
    }
    user.save
    if current_user.is_profile_ok?
      # Everything is OK - Redirect to home

      user.register_activity('submit profile')
      
      session[:notice] = 'Profile was successfully updated.'

      # State machine event
      current_user.finished_editing_profile
      eval current_user.redirect, binding()
      return

      redirect_to :root
    else
      # Validation failed
      session[:alert] = 'Not all requied values are filled in.'
      redirect_to :action => :edit
    end
  end

  def method_missing(*args)
    session[:alert] = 'You have entered an invalid URL.'
    redirect_to :root
  end

end
