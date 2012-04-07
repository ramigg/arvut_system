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

  #rescue_from CanCan::AccessDenied do |exception|
  #  redirect_to root_url, :alert => exception.message
  #end

end
