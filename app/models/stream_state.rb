class StreamState < ActiveRecord::Base
  has_many :stream_presets
  has_many :stream_images
end