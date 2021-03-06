class PresetLanguage < ActiveRecord::Base
  belongs_to :stream_preset
  belongs_to :language
  belongs_to :technology
  belongs_to :quality

  has_many :stream_items
  accepts_nested_attributes_for :stream_items, :allow_destroy => true
end

# TO ADD NEW LANGUAGE: !!!!
# PresetLanguage.where(stream_preset_id: 3 (Special Lesson), language_id: Language.where(locale: 'xxx').first, technology_id: 3(Flash)).first.update_attribute(:quality_id, 1)
