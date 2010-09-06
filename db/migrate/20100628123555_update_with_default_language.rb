class UpdateWithDefaultLanguage < ActiveRecord::Migration
  def self.up
    [{:locale => 'en',:language => 'English'},
      {:locale => 'he',:language => 'עברית'},
      {:locale => 'ru',:language => 'Русский'}
    ].each{|e| Language.create(e)}

    update_language(Questionnaire.all)
    update_language(User.all)
  end

  def self.down
    [{:locale => 'en',:language => 'English'},
      {:locale => 'he',:language => 'עברית'},
      {:locale => 'ru',:language => 'Русский'}
    ].each{|e| Language.where(:locale => e.locale).all.each { |l| l.delete }}
    update_language(Questionnaire.all, true)
    update_language(User.all, true)
  end

  def self.update_language(objects, remove = false)
    if remove
      lang = nil
    else
      lang = Language.where(:locale => 'he').first rescue nil
    end

    objects.each do |o|
      o.language = lang
      o.save
    end
  end
end
