class RedirectorController < ActionController::Metal
  include ActionController::Helpers
  include ActionController::Cookies
  include ActionController::Redirecting
  include Rails.application.routes.url_helpers

  PREFIX = "#{Rails.configuration.site_prefix}"
  PATTERN = /^\/(#{(Language.all.map{|e|e.locale} rescue []).join('|')})/

  def to_locale
    redirect env['PATH_INFO']
  end

  def to_home
    redirect '/stream/all'
  end

  def to_login
    redirect '/users/login'
  end

  private
  def redirect(path)
    host = env['HTTP_HOST']
    # Is there some known language in path? Default: en
    def_lang = cookies[:sviva_tova_locale] || 'en'
    lang = PATTERN.match(env['PATH_INFO']) || "/#{def_lang}"
    # Transfer also query parameters
    query = env['QUERY_STRING'].empty? ? '' : "?#{env['QUERY_STRING']}"
    # Copy flash to session
    env['rack.session']['alert'] = env['rack.session']['flash'][:alert] rescue nil
    env['rack.session']['notice'] = env['rack.session']['flash'][:notice] rescue nil
    redirect_to("https://#{host}#{PREFIX}#{lang}#{path}#{query}")
  end
end
