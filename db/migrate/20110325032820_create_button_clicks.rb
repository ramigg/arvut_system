class CreateButtonClicks < ActiveRecord::Migration
  def self.up
    create_table :button_clicks do |t|
      t.integer :user_id
      t.timestamps
    end
    add_index :button_clicks, :user_id
  end

  def self.down
    drop_table :button_clicks
  end
end
