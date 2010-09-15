class AddCacheTable < ActiveRecord::Migration
  def self.up
    create_table :caches do |t|
      t.string  :content_type
      t.string  :content_uid
      t.text    :content

      t.references :language

      t.timestamps
    end
    change_table :caches do |t|
      t.index [:content_type, :content_uid, :language_id]
    end
  end

  def self.down
    drop_table :caches
  end
end
