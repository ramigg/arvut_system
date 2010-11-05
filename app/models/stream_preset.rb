class StreamPreset < ActiveRecord::Base
  has_many :stream_items, :order => 'language_id, id ASC'
  has_many :pages

  accepts_nested_attributes_for :stream_items, :allow_destroy => true#, :reject_if => proc { |obj| obj.blank? }
end