class ConvertPagesPublishAtToTimestamp < ActiveRecord::Migration
  def self.up
    change_column :pages, :publish_at, :timestamp
  end

  def self.down
  end
end
