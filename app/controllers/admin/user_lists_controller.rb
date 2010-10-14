class Admin::UserListsController < ApplicationController
  before_filter :check_if_groupmanager

  respond_to :html

  # get
  def index
    @groups = UsersGroup.all
    users_group = UsersGroup.find(params[:users_group][:id]) rescue UsersGroup.first
    @user_lists = users_group.user_lists.sort_by{ |ul|
      [
        ul.users_group.name,
        ul.last_name,
        ul.first_name
      ]
    }
  end

  # get
  def show

  end

  # get
  def new
    @user_list = UserList.new

    respond_with(:new_admin, @user_list)
  end

  # post
  def create
    @user_list = UserList.new(params[:user_list])
    if @user_list.save
      flash[:notice] = I18n.t 'admin.user_list.create'
    end
    respond_with(:admin, @user_list, :location => admin_user_lists_url)
  end

  # get
  def edit
    @user_list = UserList.find(params[:id])
  end

  # put
  def update
    @user_list = UserList.find(params[:id])

    if @user_list.update_attributes(params[:user_list])
      flash[:notice] = I18n.t 'admin.user_list.update'
    end
    respond_with(:admin, @user_list, :location => admin_user_lists_url)
  end

  # delete
  def destroy
    @user_list = UserList.find(params[:id])
    @user_list.destroy
    flash[:notice] = I18n.t 'admin.user_list.destroy'
    respond_with(:admin, @user_list)
  end

end
