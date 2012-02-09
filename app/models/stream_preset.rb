class StreamPreset < ActiveRecord::Base
  has_many :pages
  has_many :stream_items
  belongs_to :stream_state
  
  has_many :preset_languages
  accepts_nested_attributes_for :preset_languages

  delegate :inactive_image, :to => :stream_state

  def stream_state_text
    if is_active?
      'Active'
    elsif stream_state
      stream_state.name.humanize
    else
      'Not active'
    end
  end
  
end
