class AddSecretWord < ActiveRecord::Migration
  def self.up
    change_table :stream_presets do |t|
      t.text :secret_word
    end
  end

  def self.down
    change_table :stream_presets do |t|
      t.remove :secret_word
    end
  end
end
