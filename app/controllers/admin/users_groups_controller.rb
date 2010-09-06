#require 'win32ole'

class Admin::UsersGroupsController < ApplicationController
  before_filter :check_if_groupmanager
  
  respond_to :html

  def new
    @users_group = UsersGroup.new
    respond_with @users_group
  end

  def create
    # Do not forget to use set :nobomb in VIM
    uploaded_io = params[:file]
#    filename = Rails.root.join('tmp', uploaded_io.original_filename).to_s

    if params[:users_group][:name].empty?
      flash[:alert] = 'No group name is supplied'
      redirect_to :action => :new
      return
    end

    if uploaded_io.nil?
      flash[:alert] = 'No file is supplied'
      redirect_to :action => :new
      return
    end

    @users_group = UsersGroup.new params[:users_group]
    
    while line = uploaded_io.gets
      items = line.mb_chars.chomp.split(/,/)
      email = items[2].to_s
      user_list_item = UserList.new(
        :last_name => items[0].to_s,
        :first_name => items[1].to_s,
        :email => email
      )
      user_list_item.user = User.where(:email => email).first
      @users_group.user_lists << user_list_item
    end

    if @users_group.save
      flash[:notice] = 'Successfully loaded'
    else
      flash[:alert] = 'Failed to load from file'
    end

    respond_with(@users_group, :location => dashboard_url)
  end

end
