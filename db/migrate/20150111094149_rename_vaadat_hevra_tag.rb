class RenameVaadatHevraTag < ActiveRecord::Migration
  def self.up
    t = Tag.where(name: 'ועדת חברה')
    t.update_attribute(:name, 'צוות חברתי')
  end

  def self.down
    t = Tag.where(name: 'צוות חברתי')
    t.update_attribute(:name, 'ועדת חברה')
  end
end
