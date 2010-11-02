class FixReadPages < ActiveRecord::Migration
  def self.up
    PageUserflag.all.each{|puf|
      puf.update_attribute('is_read', true)
    }
  end

  def self.down
  end
end
