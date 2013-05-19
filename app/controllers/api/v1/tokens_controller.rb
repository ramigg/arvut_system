class Api::V1::TokensController < Api::V1::ApiController
  skip_before_filter :verify_authenticity_token

  def create
    email = params[:email]
    password = params[:password]
    if request.content_type != 'application/json'
      render :status => 406, :json => {:error => "The request must be json"}
      return
    end

    if email.nil? or password.nil?
      render :status => 400,
             :json => {:error => "The request must contain the user email and password."}
      return
    end

    @user=User.find_by_email(email.downcase)

    if @user.nil?
      logger.info("User #{email} failed signin, user cannot be found.")
      render :status => 401, :json => {:error => "Invalid email or passoword."}
      return
    end

    # http://rdoc.info/github/plataformatec/devise/master/Devise/Models/TokenAuthenticatable
    @user.ensure_authentication_token!

    if @user.valid_password?(password)
      render :status => 200, :json => {:token => @user.authentication_token}
    else
      logger.info("User #{email} failed signin, password \"#{password}\" is invalid")
      render :status => 401, :json => {:error => "Invalid email or password."}
    end
  end

  def destroy
    @user=User.find_by_authentication_token(params[:id])
    if @user.nil?
      logger.info("Token not found.")
      render :status => 404, :json => {:error => "Invalid token."}
    else
      @user.reset_authentication_token!
      render :status => 200, :json => {:token => params[:id]}
    end
  end

end
