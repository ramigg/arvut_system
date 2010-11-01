class StreamItem < ActiveRecord::Base
  belongs_to :stream_preset
  belongs_to :language
  
end