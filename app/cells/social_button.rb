require 'net/http'
require 'uri'

class SocialButton < Apotomo::Widget
  respond_to_event :button_press, :with => :button_press
  respond_to_event :button_clicks_edit, :with => :button_clicks_edit
  
  helper_method :current_user
  
  def display
    user = param :user
    @status = ButtonClick.status(user.id)
    @button_class = @status ? 'we_button' : 'me_button'
    @timeout = ButtonClick.time_left(user.id)
    @button_click_set = user.button_click_set || '1'
    calc_today_clicks(@button_click_set)
    render
  end

  def button_press
    user = param :user
    @status = ButtonClick.status(user.id)
    ButtonClick.create(:user_id => user.id) unless @status
    calc_today_clicks
    render
  end

  def button_clicks_edit
    user = param :user
#    if params[:user]
    user.update_attributes(params[:user])
    @button_click_set = user.button_click_set
    calc_today_clicks(@button_click_set)
    render
  end

  def current_user
    param :user
  end
  
  private
  def calc_today_clicks(total = nil)
    @today_clicks = ButtonClick.today_clicks(current_user.id).count
    @today_total = total.blank? ? current_user.button_click_set : total

    if @today_total.blank? || @today_total < 1 || @today_total < @today_clicks
      @today_total = [1, clicks.to_i].max
    end

    @today_clicks_src = "https://chart.googleapis.com/chart?cht=p3&chs=200x100&chd=t:#{@today_clicks},#{@today_total-@today_clicks}&chco=19B743,FF0000&chdl=We|Me"
  end

end