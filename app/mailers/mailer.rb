class Mailer < ActionMailer::Base
  include SendGrid

  sendgrid_enable :gravatar

  default :from => "internet@kabbalahgroup.info"
  default_url_options[:host] = "kabbalahgroup.info#{Rails.configuration.site_prefix}" if Rails.env == 'production'

  def new_user_to_security(user)
    ActionMailer::Base.default_content_type = 'text/plain'
    headers = {
        :from => 'Bnei Baruch <internet@kbb1.com>',
        :subject => "New user registration: #{user.email}",
        :to => 'kola.ish@gmail.com',
        :date => Time.now.to_formatted_s(:rfc822),
        :content_type => 'text/plain'
    }
    @user = user
    @data = JSON.parse(@user.sn_data || {}).to_yaml.gsub(/\n/, '<br/>')
    mail(headers)
  end

  def new_user_to_user(user, password)
    ActionMailer::Base.default_content_type = 'text/plain'
    headers = {
        :from => 'Bnei Baruch <internet@kbb1.com>',
        :subject => "New user registration: #{user.email}",
        :to => user.email,
        :bcc => 'kola.ish@gmail.com',
        :date => Time.now.to_formatted_s(:rfc822),
        :content_type => 'text/plain'
    }
    @user = user
    @password = password
    mail(headers)
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.actionmailer.mailer.send_notification.subject
  #
  def send_questionnaire_notification(user, questionnaire)
    @locale = questionnaire.language.locale
    headers = {
      :from => 'Bnei Baruch <internet@kbb1.com>',
      :subject => I18n.t('notification.mailer.new_questionnaire_for_you', :locale => @locale),
      :to => user.email,
      :date => Time.now.to_formatted_s(:rfc822)
    }
    @user = user
    @questionnaire = questionnaire
    mail(headers) do |format|
      format.text
      format.html
    end
  end

  def send_problem_notification(problem, remote_ip, locale)
    headers = {
      :from => 'Bnei Baruch <internet@kbb1.com>',
      :subject => 'New problem was reported',
      :to => 'support@kab.tv',
      :date => Time.now.to_formatted_s(:rfc822)
    }
    @problem = problem
    @user = problem.user
    @locale = locale
    @remote_ip = remote_ip
    mail(headers) do |format|
      format.text
      format.html
    end
  end
end
