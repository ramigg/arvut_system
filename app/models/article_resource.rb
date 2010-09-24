class ArticleResource < ActiveRecord::Base
  has_many :assets, :as => :resource
  has_many :pages, :through => :assets
  belongs_to :language

  validates :body, :presence => true
end