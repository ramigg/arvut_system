class Technology < ActiveRecord::Base
  has_many :preset_languanges
  has_many :stream_items
end
