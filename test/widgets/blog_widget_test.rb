require 'test_helper'

class BlogWidgetTest < Apotomo::TestCase
  test "display" do
    invoke :display
    assert_select "p"
  end
  

end
