class KabtvListing < Kabtv
  set_table_name "listing"

  def self.get_day(weekday, language)
    where(:lang => language, :week_day => weekday).order(:start_time).all
  end
end
