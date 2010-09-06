class UsersGroup < ActiveRecord::Base
  has_many :user_lists
end
