Simulator::Application.configure do
  # Settings specified here will take precedence over those in config/environment.rb
  config.i18n.default_locale = :en

  #site prefix
  config.site_prefix = '/internet'
  config.open_stream_in_popup = false
  config.open_blog_in_popup = false

  # The production environment is meant for finished, "live" apps.
  # Code is not reloaded between requests
  config.cache_classes = true

  # Full error reports are disabled and caching is turned on
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  # Specifies the header that your server uses for sending files
  config.action_dispatch.x_sendfile_header = "X-Sendfile"

  # For nginx:
  config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect'

  # If you have no front-end server that supports something like X-Sendfile,
  # just comment this out and Rails will serve the files

  # See everything in the log (default is :info)
  # config.log_level = :debug
  config.log_level = :warn

  # Use a different logger for distributed setups
  # config.logger = SyslogLogger.new

  # Use a different cache store in production
  config.cache_store = :mem_cache_store, { :namespace => 'Sviva-Tova', :compression => false }#, :expires_in => 20.minutes}

  # Disable Rails's static asset server
  # In production, Apache or nginx will already do this
  config.serve_static_assets = true

  # Enable serving of images, stylesheets, and javascripts from an asset server
  # config.action_controller.asset_host = "http://assets.example.com"
  config.action_controller.asset_host = Proc.new{|source, request|
    "#{request.protocol}#{request.host_with_port}#{config.site_prefix}"
  }

    config.action_mailer.delivery_method = :remail
    config.action_mailer.remail_settings = {
      :app_id  => "remail-bb",
      :api_key => "a3bd9c1d-1ea5-4e27-92ae-def9754d943a"
    }

  # Disable delivery errors, bad email addresses will be ignored
  # config.action_mailer.raise_delivery_errors = false

  # Enable threaded mode
  # config.threadsafe!

  config.active_support.deprecation = :notify

  # enable push-engine (update web-page without refresh)
  config.enable_comet = false 
  config.comet_server = "kabbalahgroup.info"
  config.comet_application_id = "1"
  comet_yml = YAML::load_file("#{::Rails.root}/config/comet.yml")
  config.comet_auth_key = comet_yml["comet_auth_key"]
  config.comet_auth_iv = comet_yml["comet_auth_iv"]
end
