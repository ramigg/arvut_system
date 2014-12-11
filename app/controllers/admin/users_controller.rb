require 'securerandom'

class Admin::UsersController < ApplicationController

  before_filter :check_if_admin

  def create
    begin
      @emails = params['emails'].split(/[\n\s,]/) - ["", nil]
      @emails.reject! do |email|
        user = User.new(email: email)
        user.confirmed_at = Time.now # confirmed!!!
        password = user.password = user.password_confirmation = SecureRandom.hex(3)
        if User.exists?(email: email)
          true
        elsif user.save
          Mailer.new_user_to_user(user, password).deliver
          true
        else
          false
        end
      end
      @emails = (@emails || []).join("\n")
    rescue => e
      @emails = params[:emails]
      flash[:alert] = 'The email list is not correct. Please make sure all emails are correct.'
      render :action => 'new'
      return
    end

    if @emails.blank?
      flash[:notice] = "Successfully created Users."
      redirect_to admin_roles_path
    else
      render :action => 'new'
    end
  end

end
