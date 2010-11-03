class Kabtv < ActiveRecord::Base
  self.abstract_class = true
  establish_connection "kabtv_#{Rails.env}".to_sym

  private

  MAPPING = {
    :en => 'English',
    :he => 'Hebrew',
    :ru => 'Russian',
    :de => 'German',
    :it => 'Italian',
    :es => 'Spanish',
    :fr => 'French',
  }
  REV_MAPPING = MAPPING.invert

  def self.map_locale_2_language(locale)
    MAPPING[locale] || 'English'
  end
  def self.map_language_2_locale(language)
    REV_MAPPING[language] || :en
  end

end
