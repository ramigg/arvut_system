class ArticleResource < ActiveRecord::Base
  has_many :assets, :as => :resource
  has_many :pages, :through => :assets
  belongs_to :language

  validates :body, :presence => true
  validates :name, :length => {:maximum => 255}
end