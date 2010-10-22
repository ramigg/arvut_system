require 'test_helper'

class TagsTest < Apotomo::TestCase
  test "display_wrapper" do
    invoke :display_wrapper
    assert_select "p"
  end
  
  test "display" do
    invoke :display
    assert_select "p"
  end
  

end
