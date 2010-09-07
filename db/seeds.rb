# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)
['Groupmanager', 'Moderator', 'Reports', 'Anonymous', 'Regular', 'Admin', 'Super'].each do |role|  
  Role.find_or_create_by_role role
end

[{:locale => 'en',:language => 'English'},
  {:locale => 'he',:language => 'עברית'},
  {:locale => 'ru',:language => 'Русский'},
  {:locale => 'es',:language => 'Español'}
].each{|e| Language.find_or_create_by_locale_and_language(e)}
