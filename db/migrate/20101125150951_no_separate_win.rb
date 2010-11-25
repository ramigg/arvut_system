class NoSeparateWin < ActiveRecord::Migration
  def self.up
    change_table :stream_presets do |t|
      t.boolean :show_separate_window, :default => true
    end
  end

  def self.down
    change_table :stream_presets do |t|
      t.remove :show_separate_window
    end
  end
end
