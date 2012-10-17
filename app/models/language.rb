class Language < ActiveRecord::Base
  has_many :questionnaires
  has_many :users

  has_many :audio_resources
  has_many :article_resources
  has_many :video_resources
  has_many :pages

  has_many :preset_languages

  has_many :mobile_presets

  scope :by_locale, lambda {|locale| where(:locale => locale) } rescue nil
  scope :by_name, lambda {|name| where(:language => name) } rescue nil

  scope :default, where(:locale => 'en') rescue nil

  #  Returns Language id by locale (i.e. locale='en')
  def self.get_id_by_locale(locale)
    result = by_locale(locale.to_s)
    # TODO(kolman): What is better from two lines below?
    #result.try(:first).try(:id) || default.first.id
    (result.empty? ? default : result).first.id
  end

  #  Returns Language id by language name (i.e. name='Русский')
  def self.get_id_by_name(name)
    result = by_name(name.to_s)
    (result.empty? ? default : result).first.id
  end

  def self.default_locale
    self.default.first.locale
  end

  def self.options_for_select
    all.map{|l| [l.language, l.id]} rescue []
  end
end
