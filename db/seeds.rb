# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)
puts '--> Roles'
['Groupmanager', 'super_moderator', 'Moderator',
  'Stream_Manager','stream_operator', 'rav_posting', 'frontend_editor',
  'Reports', 'Anonymous', 'Regular', 'Admin', 'Super',
].each do |role|
  Role.find_or_create_by_role role
end

puts '--> Languages'
[{:locale => 'en',:language => 'English'},
  {:locale => 'he',:language => 'עברית'},
  {:locale => 'ru',:language => 'Русский'},
  {:locale => 'es',:language => 'Español'},
  {:locale => 'fr',:language => 'Français'},
  {:locale => 'it',:language => 'Italiano'},
  {:locale => 'de',:language => 'Deutsch'},
  {:locale => 'pt',:language => 'Portuguese'},
].each{|e| Language.find_or_create_by_locale_and_language(e)}

puts '--> Stream States'
[{:name => 'not_active'},
  {:name => 'preparing_to_broadcast'},
  {:name => 'technical_problem'},
].each{|e| StreamState.find_or_create_by_name(e)}


unless Location.count > 0
  puts '--> Locations prepare'

  sql = <<-my_code
-- Cleanup
DROP INDEX IF EXISTS index_names_on_country;

DELETE FROM locations;
DELETE FROM regions;
DELETE FROM countries;

-- Data is in ISO-8859-15 format
SET client_encoding to "ISO-8859-15";
  my_code
  Location.find_by_sql sql

  require 'csv'

  puts '--> Countries'
  # Countries
  @c = {}
  CSV::Reader.parse(File.open('GeoIPCountryWhois.csv', 'rb')) do |row|
    next if row[4] == 'A1' || row[4] == 'A2'
    @c[row[4]] ||= row[5]
  end
  @c['AD'] ||= 'Andorra'
  @c['AE'] ||= 'United Arab Emirates'
  @c['AF'] ||= 'Afghanistan'
  @c['AG'] ||= 'Antigua and Barbuda'
  @c['AI'] ||= 'Anguilla'
  @c['AL'] ||= 'Albania'
  @c['AM'] ||= 'Armenia'
  @c['AN'] ||= 'Netherlands Antilles'
  @c['AO'] ||= 'Angola'
  @c['AQ'] ||= 'Antarctica'
  @c['AR'] ||= 'Argentina'
  @c['AS'] ||= 'American Samoa'
  @c['AT'] ||= 'Austria'
  @c['AU'] ||= 'Australia'
  @c['AW'] ||= 'Aruba'
  @c['AX'] ||= 'Åland Islands'
  @c['AZ'] ||= 'Azerbaijan'
  @c['BA'] ||= 'Bosnia and Herzegovina'
  @c['BB'] ||= 'Barbados'
  @c['BD'] ||= 'Bangladesh'
  @c['BE'] ||= 'Belgium'
  @c['BF'] ||= 'Burkina Faso'
  @c['BG'] ||= 'Bulgaria'
  @c['BH'] ||= 'Bahrain'
  @c['BI'] ||= 'Burundi'
  @c['BJ'] ||= 'Benin'
  @c['BL'] ||= 'Saint Barthélemy'
  @c['BM'] ||= 'Bermuda'
  @c['BN'] ||= 'Brunei'
  @c['BO'] ||= 'Bolivia'
  @c['BR'] ||= 'Brazil'
  @c['BS'] ||= 'Bahamas'
  @c['BT'] ||= 'Bhutan'
  @c['BV'] ||= 'Bouvet Island'
  @c['BW'] ||= 'Botswana'
  @c['BY'] ||= 'Belarus'
  @c['BZ'] ||= 'Belize'
  @c['CA'] ||= 'Canada'
  @c['CC'] ||= 'Cocos [Keeling] Islands'
  @c['CD'] ||= 'Congo [DRC]'
  @c['CF'] ||= 'Central African Republic'
  @c['CG'] ||= 'Congo [Republic]'
  @c['CH'] ||= 'Switzerland'
  @c['CI'] ||= 'Ivory Coast'
  @c['CK'] ||= 'Cook Islands'
  @c['CL'] ||= 'Chile'
  @c['CM'] ||= 'Cameroon'
  @c['CN'] ||= 'China'
  @c['CO'] ||= 'Colombia'
  @c['CR'] ||= 'Costa Rica'
  @c['CS'] ||= 'Serbia and Montenegro'
  @c['CU'] ||= 'Cuba'
  @c['CV'] ||= 'Cape Verde'
  @c['CX'] ||= 'Christmas Island'
  @c['CY'] ||= 'Cyprus'
  @c['CZ'] ||= 'Czech Republic'
  @c['DE'] ||= 'Germany'
  @c['DJ'] ||= 'Djibouti'
  @c['DK'] ||= 'Denmark'
  @c['DM'] ||= 'Dominica'
  @c['DO'] ||= 'Dominican Republic'
  @c['DZ'] ||= 'Algeria'
  @c['EC'] ||= 'Ecuador'
  @c['EE'] ||= 'Estonia'
  @c['EG'] ||= 'Egypt'
  @c['EH'] ||= 'Western Sahara'
  @c['ER'] ||= 'Eritrea'
  @c['ES'] ||= 'Spain'
  @c['ET'] ||= 'Ethiopia'
  @c['FI'] ||= 'Finland'
  @c['FJ'] ||= 'Fiji'
  @c['FK'] ||= 'Falkland Islands'
  @c['FM'] ||= 'Micronesia'
  @c['FO'] ||= 'Faroe Islands'
  @c['FR'] ||= 'France'
  @c['GA'] ||= 'Gabon'
  @c['GB'] ||= 'United Kingdom'
  @c['GD'] ||= 'Grenada'
  @c['GE'] ||= 'Georgia'
  @c['GF'] ||= 'French Guiana'
  @c['GG'] ||= 'Guernsey'
  @c['GH'] ||= 'Ghana'
  @c['GI'] ||= 'Gibraltar'
  @c['GL'] ||= 'Greenland'
  @c['GM'] ||= 'Gambia'
  @c['GN'] ||= 'Guinea'
  @c['GP'] ||= 'Guadeloupe'
  @c['GQ'] ||= 'Equatorial Guinea'
  @c['GR'] ||= 'Greece'
  @c['GS'] ||= 'South Georgia and the South Sandwich Islands'
  @c['GT'] ||= 'Guatemala'
  @c['GU'] ||= 'Guam'
  @c['GW'] ||= 'Guinea-Bissau'
  @c['GY'] ||= 'Guyana'
  @c['HK'] ||= 'Hong Kong'
  @c['HM'] ||= 'Heard Island and McDonald Islands'
  @c['HN'] ||= 'Honduras'
  @c['HR'] ||= 'Croatia'
  @c['HT'] ||= 'Haiti'
  @c['HU'] ||= 'Hungary'
  @c['ID'] ||= 'Indonesia'
  @c['IE'] ||= 'Ireland'
  @c['IL'] ||= 'Israel'
  @c['IM'] ||= 'Isle of Man'
  @c['IN'] ||= 'India'
  @c['IO'] ||= 'British Indian Ocean Territory'
  @c['IQ'] ||= 'Iraq'
  @c['IR'] ||= 'Iran'
  @c['IS'] ||= 'Iceland'
  @c['IT'] ||= 'Italy'
  @c['JE'] ||= 'Jersey'
  @c['JM'] ||= 'Jamaica'
  @c['JO'] ||= 'Jordan'
  @c['JP'] ||= 'Japan'
  @c['KE'] ||= 'Kenya'
  @c['KG'] ||= 'Kyrgyzstan'
  @c['KH'] ||= 'Cambodia'
  @c['KI'] ||= 'Kiribati'
  @c['KM'] ||= 'Comoros'
  @c['KN'] ||= 'Saint Kitts and Nevis'
  @c['KP'] ||= 'North Korea'
  @c['KR'] ||= 'South Korea'
  @c['KW'] ||= 'Kuwait'
  @c['KY'] ||= 'Cayman Islands'
  @c['KZ'] ||= 'Kazakhstan'
  @c['LA'] ||= 'Laos'
  @c['LB'] ||= 'Lebanon'
  @c['LC'] ||= 'Saint Lucia'
  @c['LI'] ||= 'Liechtenstein'
  @c['LK'] ||= 'Sri Lanka'
  @c['LR'] ||= 'Liberia'
  @c['LS'] ||= 'Lesotho'
  @c['LT'] ||= 'Lithuania'
  @c['LU'] ||= 'Luxembourg'
  @c['LV'] ||= 'Latvia'
  @c['LY'] ||= 'Libya'
  @c['MA'] ||= 'Morocco'
  @c['MC'] ||= 'Monaco'
  @c['MD'] ||= 'Moldova'
  @c['ME'] ||= 'Montenegro'
  @c['MF'] ||= 'Saint Martin'
  @c['MG'] ||= 'Madagascar'
  @c['MH'] ||= 'Marshall Islands'
  @c['MK'] ||= 'Macedonia'
  @c['ML'] ||= 'Mali'
  @c['MM'] ||= 'Myanmar [Burma]'
  @c['MN'] ||= 'Mongolia'
  @c['MO'] ||= 'Macau'
  @c['MP'] ||= 'Northern Mariana Islands'
  @c['MQ'] ||= 'Martinique'
  @c['MR'] ||= 'Mauritania'
  @c['MS'] ||= 'Montserrat'
  @c['MT'] ||= 'Malta'
  @c['MU'] ||= 'Mauritius'
  @c['MV'] ||= 'Maldives'
  @c['MW'] ||= 'Malawi'
  @c['MX'] ||= 'Mexico'
  @c['MY'] ||= 'Malaysia'
  @c['MZ'] ||= 'Mozambique'
  @c['NA'] ||= 'Namibia'
  @c['NC'] ||= 'New Caledonia'
  @c['NE'] ||= 'Niger'
  @c['NF'] ||= 'Norfolk Island'
  @c['NG'] ||= 'Nigeria'
  @c['NI'] ||= 'Nicaragua'
  @c['NL'] ||= 'Netherlands'
  @c['NO'] ||= 'Norway'
  @c['NP'] ||= 'Nepal'
  @c['NR'] ||= 'Nauru'
  @c['NU'] ||= 'Niue'
  @c['NZ'] ||= 'New Zealand'
  @c['OM'] ||= 'Oman'
  @c['PA'] ||= 'Panama'
  @c['PE'] ||= 'Peru'
  @c['PF'] ||= 'French Polynesia'
  @c['PG'] ||= 'Papua New Guinea'
  @c['PH'] ||= 'Philippines'
  @c['PK'] ||= 'Pakistan'
  @c['PL'] ||= 'Poland'
  @c['PM'] ||= 'Saint Pierre and Miquelon'
  @c['PN'] ||= 'Pitcairn Islands'
  @c['PR'] ||= 'Puerto Rico'
  @c['PS'] ||= 'Palestinian Territories'
  @c['PT'] ||= 'Portugal'
  @c['PW'] ||= 'Palau'
  @c['PY'] ||= 'Paraguay'
  @c['QA'] ||= 'Qatar'
  @c['RE'] ||= 'Réunion'
  @c['RO'] ||= 'Romania'
  @c['RS'] ||= 'Serbia'
  @c['RU'] ||= 'Russia'
  @c['RW'] ||= 'Rwanda'
  @c['SA'] ||= 'Saudi Arabia'
  @c['SB'] ||= 'Solomon Islands'
  @c['SC'] ||= 'Seychelles'
  @c['SD'] ||= 'Sudan'
  @c['SE'] ||= 'Sweden'
  @c['SG'] ||= 'Singapore'
  @c['SH'] ||= 'Saint Helena'
  @c['SI'] ||= 'Slovenia'
  @c['SJ'] ||= 'Svalbard and Jan Mayen'
  @c['SK'] ||= 'Slovakia'
  @c['SL'] ||= 'Sierra Leone'
  @c['SM'] ||= 'San Marino'
  @c['SN'] ||= 'Senegal'
  @c['SO'] ||= 'Somalia'
  @c['SR'] ||= 'Suriname'
  @c['ST'] ||= 'São Tomé and Príncipe'
  @c['SV'] ||= 'El Salvador'
  @c['SY'] ||= 'Syria'
  @c['SZ'] ||= 'Swaziland'
  @c['TC'] ||= 'Turks and Caicos Islands'
  @c['TD'] ||= 'Chad'
  @c['TF'] ||= 'French Southern Territories'
  @c['TG'] ||= 'Togo'
  @c['TH'] ||= 'Thailand'
  @c['TJ'] ||= 'Tajikistan'
  @c['TK'] ||= 'Tokelau'
  @c['TL'] ||= 'East Timor'
  @c['TM'] ||= 'Turkmenistan'
  @c['TN'] ||= 'Tunisia'
  @c['TO'] ||= 'Tonga'
  @c['TR'] ||= 'Turkey'
  @c['TT'] ||= 'Trinidad and Tobago'
  @c['TV'] ||= 'Tuvalu'
  @c['TW'] ||= 'Taiwan'
  @c['TZ'] ||= 'Tanzania'
  @c['UA'] ||= 'Ukraine'
  @c['UG'] ||= 'Uganda'
  @c['UM'] ||= 'U.S. Minor Outlying Islands'
  @c['US'] ||= 'United States'
  @c['UY'] ||= 'Uruguay'
  @c['UZ'] ||= 'Uzbekistan'
  @c['VA'] ||= 'Vatican City'
  @c['VC'] ||= 'Saint Vincent and the Grenadines'
  @c['VE'] ||= 'Venezuela'
  @c['VG'] ||= 'British Virgin Islands'
  @c['VI'] ||= 'U.S. Virgin Islands'
  @c['VN'] ||= 'Vietnam'
  @c['VU'] ||= 'Vanuatu'
  @c['WF'] ||= 'Wallis and Futuna'
  @c['WS'] ||= 'Samoa'
  @c['XK'] ||= 'Kosovo'
  @c['YE'] ||= 'Yemen'
  @c['YT'] ||= 'Mayotte'
  @c['ZA'] ||= 'South Africa'
  @c['ZM'] ||= 'Zambia'
  @c['ZW'] ||= 'Zimbabwe'

  @countries = {}
  @c.each{|country, name|
    record = Country.create! :country => country, :name => name
    @countries[country] = {:name => name, :record => record}
  }

  puts '--> Regions'

  # Regions
  # See http://www.geonames.org
  @regions = {}
  CSV::Reader.parse(File.open('fips_include.csv', 'rb')) do |row|
    country = row[0]
    region = row[1]
    name = row[2]
    record = Region.create! :region => region, :name => name do |r|
      r.country = @countries[country][:record]
    end
    @regions[{:country => country, :region => region}] = {:name => name, :record => record}
  end

  puts '--> Cities'

  # Cities
  #@locations = {}
  CSV::Reader.parse(File.open('GeoLiteCity-Location.csv', 'rb')) do |row|
    next if row[3] == ''
  
    country = row[1]
    region = row[2]
    city = row[3]
    latitude = row[5]
    longitude = row[6]

    record = Location.create! :city => city, :latitude => latitude, :longitude => longitude do |l|
      l.country = @countries[country][:record]
      l.region = (
        @regions[{:country => country, :region => region}] ||
          @regions[{:country => country, :region => '00'}]
      ) [:record]
    end
    #  @locations[{:country => country, :region => region, :city => city}] = { :latitude => latitude, :longitude => longitude, :record => record }
  end

  sql = <<-my_code
CREATE INDEX index_names_on_country ON countries
    USING btree (country) WITH (FILLFACTOR=100);
  my_code

  Location.find_by_sql sql
  puts '--> Locations done'
end
