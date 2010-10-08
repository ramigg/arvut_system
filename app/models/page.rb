class Page < ActiveRecord::Base


  #  *Associations*

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


  #  *Validations*

  validates :title, :presence => true
  validates :message_body, :presence => true, :if => lambda{|e| e.page_type == 'message'}


  #  *Pagination*

  cattr_accessor :per_page
  @@per_page = 10 # Default
  cattr_reader :show_on_page
  @@show_on_page = [[3, 3], [10, 10], [20, 20], [50, 50], [100, 100]]

  WillPaginate::ViewHelpers.pagination_options[:previous_label] = '&larr;'
  WillPaginate::ViewHelpers.pagination_options[:next_label] = '&rarr;'

  #  *Scopes*
  scope :by_page_type, lambda {|page_type, language_id, user_reg_date|
    (page_type == 'all' ?
        where(:language_id => language_id) :
        where(:language_id => language_id, :page_type => page_type.singularize)).
      where(:publish_at.lt => Time.now, :status => 'PUBLISHED').where(:publish_at.gt => user_reg_date)
  }
  #  scope :all_pages, lambda {|language_id| where(:language_id => language_id)}
  scope :ordered,  order('is_sticky', 'publish_at DESC')
  
  #TODO Add new_pages scope
  scope :new_pages,  order('is_sticky', 'publish_at DESC')

  # Returns pages for the given user
  def self.get_my_pages(user, pageno, locale = :en )
    language_id = Language.get_id_by_locale(locale)
    paginate :page => pageno, :order => ['updated_at DESC, publish_at DESC'], :conditions => ['author_id = ? AND language_id = ?', user, language_id]
  end
  
  def tags(locale)
    send "#{locale}_tag_list"
  end

  def self.all_tags(locale)
    tag_counts_on(:"#{locale}_tags").all.map{|e| e.name}
  end
end
