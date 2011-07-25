require 'net/http'
require 'uri'

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
    @status = ButtonClick.status(user.id)
    @button_class = @status ? 'we_button' : 'me_button'
    @timeout = ButtonClick.time_left(user.id)
    @button_click_set = get_button_click_set()
    calc_today_clicks(user.id, user.email, @button_click_set)
    render
  end

  def button_press
    user = param :user
    @status = ButtonClick.status(user.id)
    ButtonClick.create(:user_id => user.id) unless @status
    calc_today_clicks(user.id, user.email)
    determine_button_content
    render
  end

  def button_clicks_edit
    user = param :user
#    if params[:user]
    user.update_attributes(params[:user])
    @button_click_set = get_button_click_set()
    calc_today_clicks(user.id, user.email, @button_click_set)
    render
  end

  def current_user
    param :user
  end
  
  private
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


UPPER_LIMIT_TO_SHOW_BUTTON_CONTENT = 4
 def determine_button_content
    @is_show_button_content = false

    return unless ::Rails.configuration.enable_button_content

    button_content_count = Page.get_button_content_count

    if button_content_count > 0
      loc_today_total = @today_total
      loc_today_clicks = @today_clicks

      loc_today_clicks = 1 if  loc_today_clicks <= 0
      loc_today_total = 1 if loc_today_total <= 0

      gen_step = loc_today_total / UPPER_LIMIT_TO_SHOW_BUTTON_CONTENT.to_f
      prev_click_range_num  =  ((loc_today_clicks -1)  /  gen_step).to_int
      cur_click_range_num  =  (loc_today_clicks  /  gen_step).to_int

      if cur_click_range_num   >  prev_click_range_num
            @is_show_button_content = true
      end
    end
  end

end