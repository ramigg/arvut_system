class CreateStreamItemTable < ActiveRecord::Migration
  def self.up
    create_table :stream_items, :force => true do |t|
      t.string :description
      t.string :stream_url
      t.string :inactive_image
      t.boolean :is_default
      t.references :language
      t.references :stream_preset
      t.timestamps
    end
    add_index :stream_items, :stream_preset_id
    add_index :stream_items, :language_id
  end

  def self.down
    remove_index :stream_items, :language_id
    remove_index :stream_items, :stream_preset_id
    drop_table :stream_items
  end
end