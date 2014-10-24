class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def odnoklassniki
    if data = request.env["omniauth.auth"]
      if @user = User.where(sn_id: data['uid']).first
        @user.update_attributes(sn_provider: 'odnoklassniki', sn_id: data['uid'], sn_data: data.to_json, avatar: URI.parse(data['info']['image']))
        sign_in_and_redirect @user, event: :authentication #this will throw if @user is not activated
      elsif
        user = TempUser.find_or_create_by_sn_id(data['uid'])
        user.update_attributes(sn_provider: 'odnoklassniki', sn_id: data['uid'], sn_data: data.to_json)
        session['devise.user_id'] = user.id
        redirect_to new_user_registration_path
      else
        redirect_to new_user_session_path, alert: 'Unable to authenticate via Odnoklassniki.'
      end
    else
      redirect_to new_user_session_path, alert: 'Unable to authenticate via Odnoklassniki.'
    end
  end
end
