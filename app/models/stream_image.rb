class StreamImage < ActiveRecord::Base
  belongs_to :stream_state, :touch => true
  belongs_to :language

  scope :by_language, lambda{|lang_id|
    where(:language_id => lang_id)
  }
  
  after_save :touch_stream_presets
  def touch_stream_presets
    stream_state.stream_presets.each(&:touch)
  end
  
end