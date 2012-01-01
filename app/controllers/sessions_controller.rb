# /c/Users/gshilin/AppData/Local/Google/Chrome/Application/chrome.exe --user-agent="Mozilla/5.0 (Linux; U; Android 1.0; en-us; dream) AppleWebKit/525.10+ (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2"
class SessionsController < Devise::SessionsController
  layout :set_layout

  def new
    # For help page
    @resource = User.new
    @resource_name = @resource.class.to_s.underscore

    super
  end

  def create
    resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#new")
    set_flash_message(:notice, :signed_in) if is_navigational_format?
    sign_in(resource_name, resource)
    if is_mobile?
      respond_with resource, :location => mobile_index_path
    else
      respond_with resource, :location => after_sign_in_path_for(resource)
    end
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