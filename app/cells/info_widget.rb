class InfoWidget < Apotomo::Widget

  cache :display, Proc.new { {:locale => I18n.locale} }#, :expires_in => 20.minutes

  def display
    render
  end

  def my_cache_version
    { :locale => I18n.locale }
  end
end
