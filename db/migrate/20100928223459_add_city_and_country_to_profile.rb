class AddCityAndCountryToProfile < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.references :country
      t.references :region
      t.references :location
    end
  end

  def self.down
    remove_column :users, :country, :region, :location
  end
end
