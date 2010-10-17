class AddMaxmindGeodata < ActiveRecord::Migration
  def self.up
    create_table :countries do |t|
      t.string  :country
      t.string   :name
    end
    
    create_table :regions do |t|
      t.string  :region
      t.string   :name
      
      t.references :country
    end

    create_table :locations do |t|
      t.string  :city
      t.float   :latitude
      t.float   :longitude

      t.references :country
      t.references :region
    end
  end

  def self.down
    drop_table :locations
    drop_table :countries
    drop_table :regions
  end
end
