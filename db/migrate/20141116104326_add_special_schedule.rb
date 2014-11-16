class AddSpecialSchedule < ActiveRecord::Migration
  def self.up
    change_table :stream_presets do |t|
      t.boolean :show_special_schedule, :default => false
      t.text :special_schedule
    end
  end

  def self.down
    change_table :stream_presets do |t|
      t.remove :show_special_schedule, :special_schedule
    end
  end
end
