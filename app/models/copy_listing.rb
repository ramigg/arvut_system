class CopyListing < ActiveRecord::Base

  attr_accessor :lastupdate
  
  def self.get_day(weekday, language)
    where(:lang => language, :week_day => weekday).order(:start_time).all
  end
end