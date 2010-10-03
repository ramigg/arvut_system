class Region < ActiveRecord::Base
  belongs_to :country
  has_many :locations
  has_many :users
end
