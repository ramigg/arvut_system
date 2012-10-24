class AddChatEnabled < ActiveRecord::Migration
  def self.up
    change_table :pages do |t|
      t.boolean :chat_enabled, :default => false
    end
  end

  def self.down
    remove_column :pages, :chat_enabled
  end

end
