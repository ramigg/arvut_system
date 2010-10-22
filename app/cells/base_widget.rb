class BaseWidget < Apotomo::Widget
  def default_url_options(options={})
    { :locale => I18n.locale, :host => request.host_with_port }
  end
end
