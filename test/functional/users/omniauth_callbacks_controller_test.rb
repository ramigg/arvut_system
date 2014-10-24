require 'test_helper'

class Users::OmniauthCallbacksControllerTest < ActionController::TestCase
  test "should get odnoklassniki" do
    get :odnoklassniki
    assert_response :success
  end

end
