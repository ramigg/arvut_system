class AdminApplicationController < ApplicationController
  #layout 'admin'

  protect_from_forgery

  #before_filter do |controller|
  #  :authenticate_user! unless controller.is_a? TokensController #, :except => [:some_action_without_auth]
  #end
  before_filter :mailer_set_url_options




  def mailer_set_url_options
    ActionMailer::Base.default_url_options[:host] = request.host_with_port
  end




  before_filter :authenticatetoken

    def authenticatetoken
      auth_token = params[:auth_token]
      if auth_token.nil?
        render :status=>401, :json=>{:message=>"missing authentication token."}
        return
      else
        #check that the token is the correct one
        @user=User.find_by_authentication_token(auth_token)
        if @user.nil?
          logger.info("Token not found.")
          render :status=>404, :json=>{:message=>"Invalid token."}
          return
        end
      end


      @user = User.find_by_authentication_token(auth_token)
      if @user.nil?
        render :status=>401, :json=>{:message=>"you must login first"}

      else


      end


    end

  #rescue_from CanCan::AccessDenied do |exception|
  #  redirect_to root_url, :alert => exception.message
  #end


end

