class DisplayTabs < ActiveRecord::Migration
  def self.up
    change_table :stream_presets do |t|
      t.boolean :show_questions, :default => true
      t.boolean :show_schedule, :default => true
      t.boolean :show_sketches, :default => true
      t.boolean :show_support, :default => true
    end
  end

  def self.down
    change_table :stream_presets do |t|
      t.remove :show_questions, :show_schedule, :show_sketches
      t.remove :show_support
    end
  end
end
