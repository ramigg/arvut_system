class Role < ActiveRecord::Base
  has_and_belongs_to_many :users

  def self.archived_broadcasts
    @@archived_broadcasts ||= where(role: 'archived_broadcasts').first
  end

end
