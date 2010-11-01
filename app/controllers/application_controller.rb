require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder

  before_filter :set_locale, :authenticate_user!
  protect_from_forgery
  layout 'application'
  helper :layout

  # Include widgets
  include Apotomo::Rails::ControllerMethods
    has_widgets do |root|
      root << widget(:blog_widget, 'blog', :display)
      root << widget(:profile_widget, 'profile', :display, :user => current_user)
      root << widget('tags/container', 'tags', :container)
    end
  
  def set_locale
    I18n.locale = @locale = params[:locale]
#    cookies[:sviva_tova_locale] = {:value => @locale, :expires => 10.years.from_now, :domain => 'localhost' }
    response.headers['Set-Cookie'] = "sviva_tova_locale=#{@locale}; path=/; expires=#{I18n.l(1.year.from_now, :locale => :en, :format => "%a, %d-%b-%Y %H:%M:%S GMT")}"
  end

  # For any url_for (except devise)
  def default_url_options(options={})
    { :locale => (params[:locale] || I18n.locale) }
  end

  # Devise plugin only
  def self.default_url_options(options={})
    { :locale => I18n.locale }
  end

  def check_if_admin
    redirect_to :home unless current_user.is_admin?
  end

  def check_if_restricted
    redirect_to :home unless current_user.is_admin? || current_user.is_moderator? || current_user.is_reports? || current_user.is_groupmanager?
  end

  def check_if_moderator
    redirect_to :home unless current_user.is_admin? || current_user.is_moderator?
  end

  def check_if_groupmanager
    redirect_to :home unless current_user.is_admin? || current_user.is_groupmanager?
  end

  def check_if_reports
    redirect_to :home unless current_user.is_admin? || current_user.is_reports?
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
