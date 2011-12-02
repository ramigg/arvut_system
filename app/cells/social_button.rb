require 'net/http'
require 'uri'
require 'AESCrypt.rb'

class SocialButton < Apotomo::Widget
  respond_to_event :button_press, :with => :button_press
  respond_to_event :button_clicks_edit, :with => :button_clicks_edit

  helper_method :current_user
  helper_method :get_button_click_set

  def get_button_click_set
    user = param :user
    (user.button_click_set.nil? || user.button_click_set == 0) ? 1 : user.button_click_set
  end

  def display
    user = param :user
    @profile = user
    @status = ButtonClick.status(user.id)
    @button_class = @status ? 'we_button' : 'me_button'
    @timeout = ButtonClick.time_left(user.id)
    @button_click_set = get_button_click_set()
    calc_today_clicks(user.id, user.email, @button_click_set)
    set_push_authentication(user.email)
    render
  end

  def button_press
    user = param :user
    @status = ButtonClick.status(user.id)
    ButtonClick.create(:user_id => user.id) unless @status
    calc_today_clicks(user.id, user.email)
    set_push_authentication(user.email)
    determine_button_content
    render
  end

  def button_clicks_edit
    user = param :user
#    if params[:user]
    user.update_attributes(params[:user])
    @button_click_set = get_button_click_set()
    calc_today_clicks(user.id, user.email, @button_click_set)
    set_push_authentication(user.email)
    render
  end

  def current_user
    param :user
  end

  private
  def set_push_authentication(username)
    @push_username = AESCrypt.encrypt(username,
      ::Rails.configuration.comet_auth_key,
      ::Rails.configuration.comet_auth_iv,"AES-128-CBC")
    @push_authentication = AESCrypt.encrypt(@push_username,
      ::Rails.configuration.comet_auth_key,
      ::Rails.configuration.comet_auth_iv,"AES-128-CBC")
  end

  def calc_today_clicks(id, email, total = nil)
    @today_clicks = ButtonClick.today_clicks(id).count
    @today_total = total.blank? ? current_user.button_click_set : total
    if @today_total.blank? || @today_total < 1
      @today_total = 1
    end

    @today_all_clicks = ButtonClick.today_total_clicks.count
    @today_all_total = User.users_recent_button_click_set[0].total.to_i
    if @today_all_total < 1 || @today_all_total < @today_all_clicks
      @today_all_total = [1, @today_all_total.to_i].max
    end

    @users_group_id = UserList.group_id_by_email(email);
    if (@users_group_id.count < 1 or @users_group_id[0].users_group_id.blank?)
      @users_group_id = "null"
    else
      @users_group_id = @users_group_id[0].users_group_id
    end

    @today_group_clicks = ButtonClick.today_total_clics_by_gourp(email).count
    @today_group_total = User.users_recent_button_click_set_for_group(email)[0].total.to_i

    @today_group_clicks = @today_group_clicks.blank? ? 0 : @today_group_clicks
    @today_group_total = @today_group_total.blank? ? 0 : @today_group_total

    if @today_group_total < 1 || @today_group_total < @today_group_clicks
      @today_group_total = [1, @today_group_total.to_i].max
    end
  end

  # We use float constant in order to optimize calculations
  UPPER_LIMIT_TO_SHOW_BUTTON_CONTENT = 4.0

  def determine_button_content
    if Page.get_button_content_count > 0
      loc_today_clicks = @today_clicks <= 0 ? 1 : @today_clicks
      loc_today_total = @today_total <= 0 ? 1 : @today_total

      gen_step = loc_today_total / UPPER_LIMIT_TO_SHOW_BUTTON_CONTENT
      prev_click_range_num = ((loc_today_clicks - 1) / gen_step).to_i
      cur_click_range_num = (loc_today_clicks / gen_step).to_i

      @is_show_button_content = cur_click_range_num > prev_click_range_num
    else
      @is_show_button_content = false
    end
  end
end
