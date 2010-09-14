class AddResourceTables < ActiveRecord::Migration
  def self.up
    create_table :pages do |t|
      t.string  :title
      t.text  :description
      t.text    :message_body
      t.string  :status
      t.boolean :is_sticky
      t.boolean :is_public
      t.string  :page_type

      t.references :event, :language

      t.timestamps
    end
    change_table :pages do |t|
      t.index :event_id
      t.index :language_id
      t.index :status
      t.index :is_sticky
      t.index :is_public
    end

    create_table :resources do |t|
      t.boolean :is_bonus
      t.boolean :preview_show
      t.integer :position

      t.references  :resource, :polymorphic => true
      t.references :page

      t.timestamps
      
    end
    change_table :resources do |t|
      t.index :resource_type
      t.index :resource_id
      t.index :page_id
      t.index :is_bonus
      t.index :position
    end

    create_table :audio_resources do |t|
      t.string :name
      t.text :description
      t.text :embed
      t.string :url
      t.boolean :is_autoplay
      t.boolean :is_visible
      t.references :language
    end
    change_table :audio_resources do |t|
      t.index :language_id
    end

    create_table :video_resources do |t|
      t.string :name
      t.text :description
      t.string :image
      t.text :embed
      t.string :url
      t.boolean :is_autoplay
      t.references :language
    end
    change_table :video_resources do |t|
      t.index :language_id
    end

    create_table :article_resources do |t|
      t.string :name
      t.text :body
      t.references :language
    end
    change_table :article_resources do |t|
      t.index :language_id
    end

  end

  create_table :page_userflags do |t|
    t.boolean :is_read
    t.boolean :is_bookmark
    t.references :user, :page
  end

  change_table :page_userflags do |t|
    t.index :user_id
    t.index :page_id
    t.index :is_read
    t.index :is_bookmark
  end

  def self.down
    drop_table :pages
    drop_table :resources
    drop_table :audio_resources
    drop_table :video_resources
    drop_table :article_resources
    drop_table :page_userflags

  end

end
