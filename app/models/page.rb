class Page < ActiveRecord::Base
  Language.all.each do |l|
    acts_as_taggable_on "#{l.locale}_tags"
  end

  has_many :assets, :dependent => :destroy, :order => :position
  accepts_nested_attributes_for :assets, :allow_destroy => true
  accepts_nested_attributes_for :taggings, :allow_destroy => true

  [:article_resources, :video_resources, :audio_resources].each{|resource|
    has_many resource, :through => :assets
  }
  
  belongs_to :language
  belongs_to :author, :class_name => 'User', :foreign_key => 'author_id'

  validates :title, :presence => true
  validates :message_body, :presence => true, :if => lambda{|e| e.page_type == 'message'}

  ### <Support for pagination>
  cattr_accessor :per_page
  @@per_page = 10 # Default
  cattr_reader :show_on_page
  @@show_on_page = [[3, 3], [10, 10], [20, 20], [50, 50], [100, 100]]

  WillPaginate::ViewHelpers.pagination_options[:previous_label] = '&larr;'
  WillPaginate::ViewHelpers.pagination_options[:next_label] = '&rarr;'
  ### </Support for pagination>

  # Returns pages for the given user
  def self.get_my_pages(user, pageno)
    Page.paginate :page => pageno, :order => :id, :conditions => ['author_id = ?', user]
    #    records = find_by_sql where(:author_id => user).skip(offset * limit).take(limit).order(:id).to_sql
    #    count = where(:author_id => user).count
    #
    #    [records, count]
  end
end
