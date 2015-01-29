# encoding: utf-8
class RenameVaadatHevraTag < ActiveRecord::Migration
  def self.up
    t = Tag.where(name: 'ועדת חברה').first
    t.update_attribute(:name, 'צוות חברתי') if t
  end

  def self.down
    t = Tag.where(name: 'צוות חברתי').first
    t.update_attribute(:name, 'ועדת חברה')
  end
end
