module StreamWidget
  class Apotomo::Widget
    include StreamWidget::StreamHelper
    StreamHelper.instance_methods(false).each do |method|
      helper_method method
    end
  end
end
