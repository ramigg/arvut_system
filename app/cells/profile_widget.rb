class ProfileWidget < BaseWidget
  
  def display
    @profile = param :user
    render
  end

end
