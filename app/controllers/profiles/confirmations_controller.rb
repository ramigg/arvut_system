class Profiles::ConfirmationsController < Devise::ConfirmationsController
  skip_before_filter :authenticate_user!, :only => :awaiting
  
  def awaiting
    confirmation_hash = params[:confirmation_hash]
    resource = User.find(params[:id])
    expected_confirmation_hash = Digest::SHA2.hexdigest(resource.password_salt + resource.confirmation_token) rescue confirmation_hash
    if confirmation_hash != expected_confirmation_hash
      redirect_to new_user_session_path
    else
      render :awaiting
    end
  end
end