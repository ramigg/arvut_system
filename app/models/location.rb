class Location < ActiveRecord::Base
  belongs_to :country
  belongs_to :region
  has_many :users

  def self.options_for_select(country_id, region_id)
    where(:country_id => country_id).joins(:region).
      where("(regions.region = ? OR locations.region_id = ?)", '00', region_id).
      order(:city).all.map{|c| [c.city, c.id]} rescue []
  end
end
