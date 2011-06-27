# https://github.com/dhh/tolk/tree/rails3

require 'tolk'
require 'tolk/sync'
require 'tolk/import'

Tolk::ApplicationController.authenticator = proc {
  authenticate_or_request_with_http_basic('tolk: Messages\' Translation System') do |user_name, password|
    user = current_user || User.find_by_email(user_name)
    unless user.nil?
      encrypted_password = Devise::Encryptors::Sha1.digest(password, Devise.stretches, user.password_salt, Devise.pepper)

      user.email == user_name && user.encrypted_password == encrypted_password &&
          !(user.roles.map { |r| r.role } & ['Admin', 'Super', 'Translator']).empty?
    else

      false
    end
  end
}
