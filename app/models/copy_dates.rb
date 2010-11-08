class CopyDates < ActiveRecord::Base

  def self.get_day(weekday, language)
    aday = where(:lang => language, :week_day => weekday).all
    if aday.kind_of?(Array) and !aday.blank?
      d = aday[0].d
      m = aday[0].m
    else
      d = 1
      m = 0
    end
    year = DateTime.now.year
    @local_day_names ||= I18n.t 'date.day_names'
    local_day = @local_day_names[Date::DAYNAMES.index(weekday)]
    @local_month_names ||= I18n.t 'date.month_names'
    local_month = @local_month_names[m]
    "#{local_day.upcase}, #{d} #{local_month}, #{year}"
  end
end
