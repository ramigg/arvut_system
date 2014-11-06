class OauthController < ApplicationController
  skip_before_filter :authenticate_user!, only: :redirect

  def redirect
    if params[:code]
      access_token = Koala::Facebook::OAuth.new(oauth_redirect_url).get_access_token(params[:code])
      graph        = Koala::Facebook::API.new(access_token)
      sn_data      = {
          me:            graph.get_object('me'),
          picture:       graph.get_picture('me'),
          friends:       graph.get_connection('me', 'friends'),
          groups:        graph.get_connection('me', 'groups'),
          interests:     graph.get_connection('me', 'interests'),
          photos:        graph.get_connection('me', 'photos'),
          tagged_places: (graph.get_connection('me', 'tagged_places') rescue nil)
      }
      if @user = User.where(email: sn_data[:me]['email']).first
        @user.update_attributes(sn_provider: 'facebook', sn_id: sn_data[:me]['id'], sn_data: sn_data.to_json, avatar: URI.parse(sn_data[:picture]))
        sign_in_and_redirect @user, event: :authentication #this will throw if @user is not activated
      elsif sn_data[:me]
        user = TempUser.find_or_create_by_email(sn_data[:me]['email'])
        user.update_attributes(sn_provider: 'facebook', sn_id: sn_data[:me]['id'], sn_data: sn_data.to_json)
        session['devise.user_id'] = user.id
        redirect_to new_user_registration_path
      else
        redirect_to new_user_session_path, alert: 'Unable to authenticate via Facebook.'
      end
    else
      redirect_to new_user_session_path, alert: 'Unable to authenticate via Facebook.'
    end
  end
end
