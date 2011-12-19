class StreamItem < ActiveRecord::Base
  belongs_to :stream_preset, :touch => true 
  belongs_to :language

  belongs_to :preset_language
  belongs_to :technology
  belongs_to :quality
end