class Location < ActiveRecord::Base
  belongs_to :country
  belongs_to :region
  has_many :users
end
