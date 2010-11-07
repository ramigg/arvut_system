class CopyDates < ActiveRecord::Base

  def self.get_day(weekday, language)
    aday = where(:lang => language, :week_day => weekday).all
    if aday.kind_of?(Array) and !aday.blank?
      d = aday[0].d
      m = aday[0].m - 1
    else
      d = 1
      m = 0
    end
    year = DateTime.now.year
    "#{weekday.upcase}, #{Date::MONTHNAMES[m]} #{d}, #{year}"
  end
end
