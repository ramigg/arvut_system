class Users::RegistrationsController < Devise::RegistrationsController
  def create
    return
    if resource = User.where(id: session['devise.user_id']).first
    else
      build_resource
    end
    build_resource

    if resource.save
      if resource.respond_to?(:confirm!) && !resource.confirmed?
        confirmation_hash = Digest::SHA2.hexdigest(resource.password_salt + resource.confirmation_token)
        redirect_to awaiting_confirmation_path(I18n.locale, resource, confirmation_hash)
      else
        set_flash_message :notice, :signed_up
        sign_in_and_redirect(resource_name, resource)
      end
    else
      clean_up_passwords(resource)
      render_with_scope :new
    end
  end
end
