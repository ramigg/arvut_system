require 'net/http'
require 'uri'
class SocialButton < Apotomo::Widget
  respond_to_event :button_press, :with => :button_press

  def display
    user = param :user
    @status = ButtonClick.status(user.id)
    @button_class = @status ? 'we_button' : 'me_button'
    @timeout = ButtonClick.time_left(user.id)
    render
  end

  def button_press
    user = param :user
    ButtonClick.create(:user_id => user.id)
    render
  end
end