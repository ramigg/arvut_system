class CreateStreamPresetTable < ActiveRecord::Migration
  def self.up
    create_table :stream_presets, :force => true do |t|
      t.string :name
      t.boolean :is_active, :default => true
      t.timestamps
    end
  end

  def self.down
    drop_table :stream_presets
  end
end

