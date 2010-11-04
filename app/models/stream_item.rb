class StreamItem < ActiveRecord::Base
  belongs_to :stream_preset, :touch => true 
  belongs_to :language
  
end