class AddStreamPresetToPage < ActiveRecord::Migration
  def self.up
    add_column :pages, :stream_preset_id, :integer
  end

  def self.down
    remove_column :pages, :stream_preset_id
  end
end