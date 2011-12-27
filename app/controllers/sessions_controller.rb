class SessionsController < Devise::SessionsController
  layout :set_layout

  def new
    super
  end

  def create
    resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#new")
    set_flash_message(:notice, :signed_in) if is_navigational_format?
    sign_in(resource_name, resource)
    respond_with resource, :location => after_sign_in_path_for(resource)
  end

  private

  def set_layout
    if is_mobile?
      'mobile'
    else
      'application'
    end
  end

end