class ProfilesController < ApplicationController
  respond_to :html, :js

  layout 'stream'

  autocomplete :location, :city, :ref => [{:region => :name}, {:country => :name}], :limit => 20

  def edit
    @profile = current_user

    @feed = FeedReader::Basic.new(I18n.t('home.views.feed')).feed
    @tags = Page.all_tags(I18n.locale)
    #    respond_with @profile
  end

  def update
    @profile = current_user
    if @profile.update_attributes(params[:user])
      flash[:notice] = I18n.t 'profile.view.updated'
      @profile.register_activity('submit profile')
      @klass = 'notice'
    else
      @klass = 'error'
    end
    respond_with(@profile, :location => edit_profile_path(@profile))
  end

end
