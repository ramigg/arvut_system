class Region < ActiveRecord::Base
  belongs_to :country
  has_many :locations
  has_many :users

  def self.options_for_select(country_id)
    if country_id.empty?
      where(:country_id => country_id, :region => '00').order(:name).all.map { |c| [c.name, c.id] } rescue []
    else
      where(:country_id => country_id, :region.not_eq => '00').order(:name).all.map { |c| [c.name, c.id] } rescue []
    end
  end
end
