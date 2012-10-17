class CreateMobilePreset < ActiveRecord::Migration
  def self.up
    create_table :mobile_presets do |t|
      t.integer :language_id
      t.text    :stream
      t.integer :position

      t.timestamps
    end
  end

  def self.down
    drop_table :mobile_presets
  end
end
