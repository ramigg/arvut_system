class AddShowCoveritlive < ActiveRecord::Migration
  def self.up
    change_table :stream_presets do |t|
      t.boolean :show_coveritlive, :default => false
      t.text :coveritlive
    end
  end

  def self.down
    change_table :stream_presets do |t|
      t.remove :show_coveritlive, :coveritlive
    end
  end
end
