class UserObserver < ActiveRecord::Observer
  def before_save(user)
    if user.roles.empty?
      user.roles << Role.where(:role => 'Regular').first
    end

    user.user_list = UserList.where(:email => user.email).first
  end

end
