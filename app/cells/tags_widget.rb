class TagsWidget < Apotomo::Widget

  cache :display, :expires_in => 120.minutes

  def display
    @tags = Page.all_tags(I18n.locale)
    render
  end
end
