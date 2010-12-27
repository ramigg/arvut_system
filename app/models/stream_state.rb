class StreamState < ActiveRecord::Base
  has_many :stream_presets
  has_many :stream_images
  
  def inactive_image(lang_id)
    stream_images.by_language(lang_id)
  end
  
end