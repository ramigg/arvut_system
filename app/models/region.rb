class Region < ActiveRecord::Base
  belongs_to :country
  has_many :locations
  has_many :users

  def self.options_for_select(country_id)
    regions = where(:country_id => country_id, :region.ne => '00').order(:name).all.map{|c| [c.name, c.id]} rescue []
    if country_id.empty?
      regions = where(:country_id => country_id, :region => '00').order(:name).all.map{|c| [c.name, c.id]} rescue []
    end

    regions
  end
end
