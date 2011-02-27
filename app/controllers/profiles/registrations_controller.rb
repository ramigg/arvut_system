class Profiles::RegistrationsController < Devise::RegistrationsController

  def create
    build_resource

    if resource.save
      if resource.active?
        set_flash_message :notice, :signed_up
        sign_in_and_redirect(resource_name, resource)
      else
        set_flash_message :notice, :signed_up, :reason => resource.inactive_message.to_s
        expire_session_data_after_sign_in!
        redirect_to after_inactive_sign_up_path_for(resource)
      end

#      if resource.respond_to?(:confirm!) && !resource.confirmed?
#        confirmation_hash = Digest::SHA2.hexdigest(resource.password_salt + resource.confirmation_token)
#        set_flash_message :notice, :signed_up
#        redirect_to awaiting_confirmation_path(I18n.locale, resource, confirmation_hash)
#      else
#        set_flash_message :notice, :signed_up
#        sign_in_and_redirect(resource_name, resource)
#      end
    else
      clean_up_passwords(resource)
      render_with_scope :new
    end
  end
end
