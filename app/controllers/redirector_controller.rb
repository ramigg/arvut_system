class RedirectorController < ActionController::Metal
  include ActionController::Redirecting
  include Rails.application.routes.url_helpers

  PREFIX = Rails.env == 'production' ? '/simulator' : ''
  PATTERN = /^\/(#{(Language.all.map{|e|e.locale} rescue []).join('|')})/

  def to_locale
    redirect env['PATH_INFO']
  end

  def to_dashboard
    redirect '/dashboard'
  end

  def to_login
    redirect '/users/login'
  end

  private
  def redirect(path)
    host = env['HTTP_HOST']
    # Is there some known language in path? Default: en
    lang = PATTERN.match(env['PATH_INFO']) || '/en'
    # Transfer also query parameters
    query = env['QUERY_STRING'].empty? ? '' : "?#{env['QUERY_STRING']}"
    # Copy flash to session
    env['rack.session']['alert'] = env['rack.session']['flash'][:alert] rescue nil
    env['rack.session']['notice'] = env['rack.session']['flash'][:notice] rescue nil
    redirect_to("http://#{host}#{PREFIX}#{lang}#{path}#{query}")
  end
end
