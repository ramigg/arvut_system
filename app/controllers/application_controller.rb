require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :js, :html

  before_filter :set_default_locale, :authenticate_user!
  after_filter :reset_default_locale
  protect_from_forgery
  layout 'application'
  helper :layout
  
  def set_default_locale
    @default_locale = I18n.default_locale
    I18n.default_locale = I18n.locale = @locale = params[:locale]
  end

  def reset_default_locale
    I18n.default_locale = @default_locale
  end

  # For any url_for (except devise)
  def default_url_options(options={})
    { :locale => I18n.default_locale.to_s }
  end

  # Devise plugin only
  def self.default_url_options(options={})
    { :locale => I18n.default_locale.to_s }
  end

  def check_if_admin
    redirect_to :dashboard unless current_user.is_admin?
  end

  def check_if_restricted
    redirect_to :dashboard unless current_user.is_admin? || current_user.is_moderator? || current_user.is_reports? || current_user.is_groupmanager?
  end

  def check_if_moderator
    redirect_to :dashboard unless current_user.is_admin? || current_user.is_moderator?
  end

  def check_if_groupmanager
    redirect_to :dashboard unless current_user.is_admin? || current_user.is_groupmanager?
  end

  def check_if_reports
    redirect_to :dashboard unless current_user.is_admin? || current_user.is_reports?
  end
end

module Devise::Controllers::Helpers
  def after_sign_in_path_for(resource_or_scope)
    scope = Devise::Mapping.find_scope!(resource_or_scope)
    home_path = :"#{scope}_root_path"
    respond_to?(home_path, true) ? send(home_path) : root_path
  end

  def stored_location_for(resource_or_scope)
    scope = Devise::Mapping.find_scope!(resource_or_scope)
    url = session.delete(:"#{scope}_return_to")
    url
  end
end
