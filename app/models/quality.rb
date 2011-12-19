class Quality < ActiveRecord::Base
  has_many :preset_languanges
  has_many :stream_items

  def to_s
    name
  end
end
