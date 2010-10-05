class Country < ActiveRecord::Base
  has_many :regions
  has_many :locations
  has_many :users

  def self.options_for_select
    order(:name).find(:all).map{|c| [c.name, c.id]} rescue []
  end
end
