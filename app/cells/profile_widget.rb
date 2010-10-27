class ProfileWidget < Apotomo::Widget
  cache :display, :my_cache_version
  
  def display
    @profile = param :user
    render
  end

  
  def my_cache_version
    user = param :user
    {:locale => I18n.locale, :user => user.id, :updated_at => user.updated_at}
  end

end
