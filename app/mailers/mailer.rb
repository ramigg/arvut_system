class Mailer < ActionMailer::Base

  default :from => "internet@kbb1.com"
  default_url_options[:host] = 'kabbalahgroup.info/internet2' if Rails.env == 'production'

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
end
