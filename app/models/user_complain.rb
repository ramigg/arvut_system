class UserComplain < ActiveRecord::Base
  belongs_to :user
  
  belongs_to :language
  belongs_to :technology
  belongs_to :quality

  attr_accessor :simulator_breadcrumb
end
