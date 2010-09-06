# Use this hook to configure devise mailer, warden hooks and so forth. The first
# four configuration values can also be set straight in your models.
Devise.setup do |config|
  # Configure the e-mail address which will be shown in DeviseMailer.
  config.mailer_sender = "Bnei Baruch <internet@kbb1.com>"

  # ==> Configuration for any authentication mechanism
  # Configure which keys are used when authenticating an user. By default is
  # just :email. You can configure it to use [:username, :subdomain], so for
  # authenticating an user, both parameters are required. Remember that those
  # parameters are used only when authenticating and not when retrieving from
  # session. If you need permissions, you should implement that in a before filter.
  config.authentication_keys = [ :email ]

  # Tell if authentication through request.params is enabled. True by default.
  # config.params_authenticatable = true

  # Tell if authentication through HTTP Basic Auth is enabled. True by default.
  config.http_authenticatable = false

  # The realm used in Http Basic Authentication
  # config.http_authentication_realm = "Spiritual Simulator"

  # ==> Configuration for :database_authenticatable
  # Invoke `rake secret` and use the printed value to setup a pepper to generate
  # the encrypted password. By default no pepper is used.
  config.pepper = "da1d274786741413d2436bd29f4f95a825ef1d649fef79f6c7167ad9126aa07c237c48148cc1e6470f3b4dcc59befbf35e26d5d1a663aee197499ca60963e533"

  # Configure how many times you want the password is reencrypted. Default is 10.
  # config.stretches = 10

  # Define which will be the encryption algorithm. Supported algorithms are :sha1
  # (default), :sha512 and :bcrypt. Devise also supports encryptors from others
  # authentication tools as :clearance_sha1, :authlogic_sha512 (then you should set
  # stretches above to 20 for default behavior) and :restful_authentication_sha1
  # (then you should set stretches to 10, and copy REST_AUTH_SITE_KEY to pepper)
  config.encryptor = :sha1

  # ==> Configuration for :confirmable
  # The time you want give to your user to confirm his account. During this time
  # he will be able to access your application without confirming. Default is nil.
  # config.confirm_within = 2.days

  # ==> Configuration for :rememberable
  # The time the user will be remembered without asking for credentials again.
  config.remember_for = 2.weeks

  # ==> Configuration for :validatable
  # Range for password length
  config.password_length = 6..20

  # Regex to use to validate the email address
  config.email_regexp = /^([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})$/i

  # ==> Configuration for :timeoutable
  # The time you want to timeout the user session without activity. After this
  # time the user will be asked for credentials again.
  #  config.timeout_in = 2.weeks

  # ==> Configuration for :lockable
  # Defines which strategy will be used to lock an account.
  # :failed_attempts = Locks an account after a number of failed attempts to sign in.
  # :none            = No lock strategy. You should handle locking by yourself.
  config.lock_strategy = :failed_attempts

  # Defines which strategy will be used to unlock an account.
  # :email = Sends an unlock link to the user email
  # :time  = Reanables login after a certain ammount of time (see :unlock_in below)
  # :both  = Enables both strategies
  # :none  = No unlock strategy. You should handle unlocking by yourself.
  config.unlock_strategy = :both

  # Number of authentication tries before locking an account if lock_strategy
  # is failed attempts.
  config.maximum_attempts = 30

  # Time interval to unlock the account if :time is enabled as unlock_strategy.
  config.unlock_in = 1.hour

  # ==> Configuration for :token_authenticatable
  # Defines name of the authentication token params key
  config.token_authentication_key = :auth_token

  # ==> General configuration
  # Load and configure the ORM. Supports :active_record (default), :mongoid
  # (requires mongo_ext installed) and :data_mapper (experimental).
  require 'devise/orm/active_record'

  # Turn scoped views on. Before rendering "sessions/new", it will first check for
  # "sessions/users/new". It's turned off by default because it's slower if you
  # are using only default views.
  config.scoped_views = true

  # Configure the default scope used by Devise. By default it's the first devise
  # role declared in your routes.
  config.default_scope = :user

  # If you want to use other strategies, that are not (yet) supported by Devise,
  # you can configure them inside the config.warden block. The example below
  # allows you to setup OAuth, using http://github.com/roman/warden_oauth
  #
  # config.warden do |manager|
  #   manager.oauth(:twitter) do |twitter|
  #     twitter.consumer_secret = <YOUR CONSUMER SECRET>
  #     twitter.consumer_key  = <YOUR CONSUMER KEY>
  #     twitter.options :site => 'http://twitter.com'
  #   end
  #   manager.default_strategies(:scope => :user).unshift :twitter_oauth
  # end

end

# To register login event
Warden::Manager.after_authentication do |user,auth,opts|
  user.register_activity('login')
  # State machine event
  user.sign_in
end

# To register a confirmation event like it was a login event
# (real login event doesn't happen in this case)
Warden::Manager.after_set_user :except => :authentication do |user,auth,opts|
  if user.sign_in_count == 0
    user.register_activity('login') 
    # State machine event
    user.sign_in
  end
end

# To register logout event.
# There is an additional logout event after Sign up which we don't want to register
Warden::Manager.before_logout do |user,auth,opts|
  if user.respond_to?(:confirmation_token) && user.confirmation_token.nil?
    user.register_activity('logout')
    
    # State machine event
    user.sign_out
  end
end

# We need much more i18n than Devise provides by default
module DeviseHelper
  def devise_error_messages!
    return "" if resource.errors.empty?

    messages = resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join
    model = I18n.t "activerecord.models.#{resource_name}"
    sentence = I18n.t :'activerecord.errors.user.header', :count => resource.errors.count, :model => model

    html = <<-HTML
      <li class="ui-state-error">
        #{sentence}:
        <ul>#{messages}</ul>
      </li>
    HTML

    html.html_safe
  end
end
