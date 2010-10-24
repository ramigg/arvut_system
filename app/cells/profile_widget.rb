class ProfileWidget < Apotomo::Widget
  
  def display
    @profile = param :user
    render
  end

end
