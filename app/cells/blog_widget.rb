class BlogWidget < Apotomo::Widget

  cache :display, Proc.new { {:locale => I18n.locale} }, :expires_in => 20.minutes

  def display
    @feed = FeedReader::Basic.new(I18n.t('home.views.feed')).feed rescue nil
    render if @feed
  end

  def my_cache_version
    { :locale => I18n.locale }
  end
end
