class ProfilesController < ApplicationController
  respond_to :html, :js

  layout 'pages'

  autocomplete :location, :city, :ref => [{:region => :name}, {:country => :name}], :limit => 20

  def edit
    @profile = current_user
    #    respond_with @profile
  end

  def update
    @profile = current_user
    if @profile.update_attributes(params[:user])
      flash[:notice] = 'Profile was uccessfully updated'
      @profile.register_activity('submit profile')
      @klass = 'notice'
    else
      @klass = 'error'
    end
    respond_with(@profile)
  end

end
