class StreamPreset < ActiveRecord::Base
  has_many :stream_items, :order => 'language_id, id ASC'
  has_many :pages
  belongs_to :stream_state
  
  accepts_nested_attributes_for :stream_items, :allow_destroy => true#, :reject_if => proc { |obj| obj.blank? }
  
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
