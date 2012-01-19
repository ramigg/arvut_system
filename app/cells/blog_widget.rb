class BlogWidget < Apotomo::Widget

  cache :display, Proc.new { {:locale => I18n.locale} }#, :expires_in => 20.minutes

  def display
    @feed = FeedReader::Basic.retrieve(I18n.t('home.views.feed')) rescue nil
    @link_class = ::Rails.configuration.open_blog_in_popup ? 'in-wide-iframe' : ''
    render if @feed
  end

  def my_cache_version
    { :locale => I18n.locale }
  end
end
