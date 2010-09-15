class Admin::RolesController < ApplicationController

  before_filter :check_if_restricted

  autocomplete :user, :email, :add_also => [:first_name, :last_name, :confirmation_token], :full => true

  def index
    @email = params[:email]
    @all_roles = Role.order(:role).all
    @roles = Role.all
  end

  # post
  def create
    @email = params[:email]
    @all_roles = Role.order(:role).all
    @roles = params[:role]

    if params[:load_user]
      @user = User.where(:email => @email).first
      session[:alert] = "User '#{@email}' does not exist!!!" unless @user
      render :index
      return
    end
    
    unless @email.empty?
      @user = User.where(:email => @email).first
      if @user.nil?
        # Wrong email -- user doesn't exist
        session[:alert] = 'Wrong email'
      else
        @user.roles = []
        @roles.values.each { |r|
          role = Role.where(:id => r).first
          if role.nil?
            # No such role in the system -- one huge problem
            session[:alert] = "User role '#{@role}' does not exist!!!"
            redirect_to :convert_add_role
          end
          @user.roles << role
        }
        if @user.save
          session[:notice] = 'Done'
        else
          session[:alert] = 'Unable to save user'
        end
      end
    end

    render :index
  end

end