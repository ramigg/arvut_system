class VideoResource < ActiveRecord::Base
  has_many :assets, :as => :resource
  has_many :pages, :through => :assets
  belongs_to :language

  validates :embed, :presence => true, :if => lambda {|rec| rec.url.nil? || rec.url.empty?}
  validates :url, :presence => true, :if => lambda {|rec| rec.embed.nil? || rec.embed.empty?}
end