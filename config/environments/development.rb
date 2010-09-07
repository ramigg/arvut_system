require 'yaml'

Simulator::Application.configure do
  # Settings specified here will take precedence over those in config/environment.rb

  # In the development environment your application's code is reloaded on
  # every request.  This slows down response time but is perfect for development
  # since you don't have to restart the webserver when you make code changes.
  config.cache_classes = false

  # Log error messages when you accidentally call methods on nil.
  config.whiny_nils = true

  # Show full error reports and disable caching
  config.consider_all_requests_local       = true
  config.action_view.debug_rjs             = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send
  email = Rails.root.join('tmp', 'email.yml').to_s
  if File.exist?(email)
    config.action_mailer.delivery_method = :smtp
    smtp_settings = File.open( email ) { |yf| YAML::load( yf ) }
    config.action_mailer.smtp_settings = smtp_settings
  else
    #    config.action_mailer.delivery_method = :sendmail
    config.action_mailer.delivery_method = :remail
    config.action_mailer.remail_settings = {
      :app_id  => "remail-bb",
      :api_key => "a3bd9c1d-1ea5-4e27-92ae-def9754d943a"
    }
  end

  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.default_url_options = { :host => 'localhost:3000' }

  config.active_support.deprecation = :log
end
