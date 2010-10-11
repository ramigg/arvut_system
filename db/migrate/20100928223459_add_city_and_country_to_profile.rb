class AddCityAndCountryToProfile < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.references :country
      t.references :region
      t.references :location
    end
  end

  def self.down
    remove_column :users, :country_id, :region_id, :location_id
  end
end
