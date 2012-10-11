require 'yaml'

Simulator::Application.configure do
  # Settings specified here will take precedence over those in config/environment.rb

  #site prefix
  config.site_prefix = ''
  config.open_stream_in_popup = false
  config.open_blog_in_popup = false

  config.log_level = :debug
  # In the development environment your application's code is reloaded on
  # every request.  This slows down response time but is perfect for development
  # since you don't have to restart the webserver when you make code changes.
  config.cache_classes = false

  config.cache_store = :dalli_store, {:namespace => 'Sviva-Tova', :compress => true, :urlencode => false} #, :expires_in => 20.minutes}
  # Log error messages when you accidentally call methods on nil.
  config.whiny_nils = true

  # Show full error reports and disable caching
  config.consider_all_requests_local = true
  config.action_controller.perform_caching = true
  config.action_controller.page_cache_directory = Rails.public_path + '/page_cache'

  # Don't care if the mailer can't send

  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.default_url_options = {:host => 'localhost:3000'}

  config.active_support.deprecation = :log
end
