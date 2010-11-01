class StreamPreset < ActiveRecord::Base
  has_many :stream_items
  has_many :pages
  
end