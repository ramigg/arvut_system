sendgrid = Rails.configuration.general_settings['sendgrid']

settings = {
    :address => "smtp.sendgrid.net",
    :port => 587,
    :authentication => :plain,
    :user_name => sendgrid['user_name'],
    :password => sendgrid['password'],
    :domain => sendgrid['domain'],
    :enable_starttls_auto => true
}

ActionMailer::Base.smtp_settings = settings