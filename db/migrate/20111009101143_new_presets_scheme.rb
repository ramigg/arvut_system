class StreamPreset < ActiveRecord::Base
  has_many :stream_items, :order => 'language_id, id ASC'
end

class NewPresetsScheme < ActiveRecord::Migration
  def self.up
    # Add/alter tables for new scheme
    create_table :qualities do |t|
      t.string :name
      
      t.timestamps
    end unless table_exists? :qualities

    create_table :technologies do |t|
      t.string :name

      t.timestamps
    end unless table_exists? :technologies

    create_table :preset_languages do |t|
      t.integer :stream_preset_id
      t.integer :language_id
      t.integer :technology_id
      t.integer :quality_id

      t.timestamps
    end unless table_exists? :preset_languages

    add_column :stream_items, :preset_language_id, :integer unless column_exists? :stream_items, :quality_id
    add_column :stream_items, :technology_id, :integer unless column_exists? :stream_items, :technology_id
    add_column :stream_items, :quality_id, :integer unless column_exists? :stream_items, :quality_id

    # Add default data
    StreamItem.all.map(&:description).uniq.each {|quality|
      q = Quality.create :name => quality
      default_quality = q if quality == '250K'
    }
    ['WMV', 'CDN', 'Flash'].each {|tech|
      t = Technology.create :name => tech
      default_technology = t if tech == 'WMV'
    }

    default_quality = Quality.find_by_name('250K') || default_quality
    default_technology = Technology.find_by_name('WMV') || default_technology
    cdn_technology = Technology.find_by_name('CDN') || default_technology

    # Migrate existing data
    StreamPreset.all.each {|preset|
      Language.all.each {|language|
        items = preset.stream_items.select {|item| item.language == language}
        next if items.empty?
        ditem = items.detect {|item| item.is_default }
        dq = ditem ? Quality.find_by_name(ditem.description) : default_quality
        pl = PresetLanguage.create(:stream_preset_id => preset.id, :language_id => language.id,
                                   :technology_id => default_technology.id,
                                   :quality_id => dq.id
        )
        items.each {|item|
          quality = Quality.find_by_name(item.description) || default_quality
          #technology = (item.stream_url =~ /http:/) ? cdn_technology : default_technology
          technology = default_technology
          item.update_attributes(:preset_language_id => pl.id,
                                 :technology_id => technology.id,
                                 :quality_id => quality.id)
        }
      }
    }

    # Remove unnecessary fields
    remove_column :stream_items, :language_id
    remove_column :stream_items, :description
    remove_column :stream_items, :stream_preset_id
  end

  def self.down
  end
end
