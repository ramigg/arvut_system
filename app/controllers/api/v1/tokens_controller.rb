class Api::V1::TokensController < Api::V1::ApiController
  skip_before_filter :verify_authenticity_token, :authenticate_user!


  def has_archived_broadcasts
    @user = User.where(authentication_token: params[:token]).first
    if @user
      render status: 200, json: {allow_archived_broadcasts: @user.roles.include?(Role.archived_broadcasts)}
    else
      render status: 200, json: {allow_archived_broadcasts: false}
    end
  end

  def create
    email = params[:email]
    password = params[:password]
    fb_token = params[:fb_token]
    if request.content_type != 'application/json'
      render :status => 406, :json => {:error => "The request must be json"}
      return
    end

    if (email.nil? or password.nil?) and fb_token.nil?
      render :status => 400,
             :json => {:error => "The request must contain the user email and password."}
      return
    end

    email = email.downcase unless email.nil?
    @user = User.find_by_email(email) || get_email_by_fb_token(fb_token)

    if @user.nil?
      logger.info("User #{email} failed signin, user cannot be found.")
      render :status => 401, :json => {:error => "Invalid email or password #1."}
      return
    end

    # http://rdoc.info/github/plataformatec/devise/master/Devise/Models/TokenAuthenticatable
    @user.ensure_authentication_token!

    if fb_token || @user.valid_password?(password)
      render status: 200, json: {token: @user.authentication_token, allow_archived_broadcasts: @user.roles.include?(Role.archived_broadcasts)}
    else
      logger.info("User #{email} failed signin, password \"#{password}\" is invalid")
      render :status => 401, :json => {:error => "Invalid email or password. #2"}
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

  private

  def get_email_by_fb_token(access_token)
    graph        = Koala::Facebook::API.new(access_token)
    sn_data      = {
        me:            graph.get_object('me?fields=email'),
        picture:       graph.get_picture('me'),
        friends:       graph.get_connection('me', 'friends'),
        groups:        graph.get_connection('me', 'groups'),
        photos:        graph.get_connection('me', 'photos'),
        tagged_places: (graph.get_connection('me', 'tagged_places') rescue nil)
    }
    puts sn_data
    logger.error sn_data
    
    user = User.where(email: sn_data[:me]['email']).first
    user && user.update_attributes(sn_provider: 'facebook', sn_id: sn_data[:me]['id'], sn_data: sn_data.to_json, avatar: URI.parse(sn_data[:picture]))
    user
  end

end
