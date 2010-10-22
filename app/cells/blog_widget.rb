class BlogWidget < Apotomo::Widget

  def display
    @feed = FeedReader::Basic.new(I18n.t('home.views.feed')).feed
    render
  end

end
