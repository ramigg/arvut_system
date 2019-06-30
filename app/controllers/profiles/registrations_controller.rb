class Profiles::RegistrationsController < Devise::RegistrationsController

  def new
    @sn_user = TempUser.where(id: session['devise.user_id']).first
    redirect_to new_user_session_path, alert: 'Please authenticate via Social Network.' and return unless @sn_user

    super
  end

  def create
    build_resource

    @sn_user = TempUser.where(id: session['devise.user_id']).first
    data = JSON.parse(@sn_user.sn_data)
    update_user resource, @sn_user, data

    resource.confirmed_at = Time.now # confirmed!!!

    if resource.save
      @sn_user.destroy
      if resource.active?
        # Send mail to Security (Kolia)
        Mailer.new_user_to_security(resource).deliver
        sign_in_and_redirect(resource_name, resource)
      else
        set_flash_message :notice, :signed_up, :reason => resource.inactive_message.to_s
        expire_session_data_after_sign_in!
        redirect_to after_inactive_sign_up_path_for(resource)
      end
    else
      user = User.where(email: resource.email).first
      if user && user.valid_password?(resource.password)
        update_user resource, @sn_user, data

        if user.save
          sign_in_and_redirect(resource_name, user)
          return
        end
      end

      clean_up_passwords(resource)
      render_with_scope :new
    end
  end

  private

  def update_user(user, sn_user, data)
    user.sn_provider = sn_user.sn_provider
    user.sn_id = sn_user.sn_id
    user.sn_data = sn_user.sn_data
    if sn_user.sn_provider == 'facebook'
      user.email = @sn_user.email
      user.birthday = data['me']['birthday'][-4..-1]  rescue nil
      user.gender = data['me']['gender']
      user.first_name = data['me']['first_name']
      user.last_name = data['me']['last_name']
      user.avatar = URI.parse(data['picture'])
    elsif sn_user.sn_provider == 'odnoklassniki'
      user.birthday = data['extra']['raw_info']['birthday'][0..3]
      user.gender = data['extra']['raw_info']['gender']
      user.first_name = data['info']['first_name']
      user.last_name = data['info']['last_name']
      user.avatar = URI.parse(data['info']['image'])
    end
  end

end
