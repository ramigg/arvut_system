class UpdateStreams < ActiveRecord::Migration
  def self.up
    remove_column :stream_items, :inactive_image
    
    add_column :stream_presets, :stream_state_id, :integer
    create_table :stream_states, :force => true do |t|
      t.string :name
      t.timestamps
    end
    create_table :stream_images, :force => true do |t|
      t.string :name
      t.string :filename
      t.references :language, :stream_state
      t.timestamps
    end
  end

  def self.down
    drop_table :stream_images
    drop_table :stream_states
    remove_column :stream_presets, :stream_state_id
  end
end