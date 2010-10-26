class BlogWidget < Apotomo::Widget

  cache :display, :expires_in => 20.minutes

  def display
    @feed = FeedReader::Basic.new(I18n.t('home.views.feed')).feed
    render if @feed
  end
end
