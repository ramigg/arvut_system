class StreamImage < ActiveRecord::Base
  belongs_to :stream_state
  belongs_to :language
end