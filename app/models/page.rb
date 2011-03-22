class Page < ActiveRecord::Base

  #  *Associations*

  Language.all.each do |l|
    acts_as_taggable_on "#{l.locale}_tags"
  end

  has_many :assets, :dependent => :destroy, :order => :position
  has_many :questionnaire_answers

  has_many :page_userflags, :dependent => :destroy

  accepts_nested_attributes_for :questionnaire_answers, :allow_destroy => true
  accepts_nested_attributes_for :assets, :allow_destroy => true
  accepts_nested_attributes_for :taggings, :allow_destroy => true

  [:article_resources, :video_resources, :audio_resources, :questions, :intention_resources].each { |resource|
    has_many resource, :through => :assets
  }

  belongs_to :language
  belongs_to :author, :class_name => 'User', :foreign_key => 'author_id'

  belongs_to :stream_preset


  #  *Validations*

  validates :title, :presence => true
  validates :message_body, :presence => true, :if => lambda { |e| e.page_type == 'message' }

  delegate :locale, :to => :language

  #  *Pagination*

  cattr_accessor :per_page
  @@per_page = 10 # Default
  cattr_reader :show_on_page
  @@show_on_page = [[3, 3], [10, 10], [20, 20], [50, 50], [100, 100]]

  WillPaginate::ViewHelpers.pagination_options[:previous_label] = '&larr;'
  WillPaginate::ViewHelpers.pagination_options[:next_label] = '&rarr;'

  #  *Scopes*

  scope :published, lambda { where(:publish_at.lt => Time.zone.now, :status => 'PUBLISHED') }
  scope :no_parent, where(:parent_id => nil)

  #  scope :by_conf_date, lambda {|user_reg_date| where(:publish_at.gt => user_reg_date)}

  scope :by_page_type, lambda { |page_type, language_id, user_reg_date|
    (page_type == 'all' || page_type == 'tag' ?
        where(:language_id => language_id) :
        where(:language_id => language_id, :page_type => page_type.singularize)).
        no_parent.published
  }

  #  scope :all_pages, lambda {|language_id| where(:language_id => language_id)}
  scope :ordered_all, order('is_sticky DESC', 'publish_at DESC')
  scope :ordered, order('publish_at DESC')

  # scope :read_pages, lambda {|user_id| 
  #   joins(:page_userflags).where(:page_userflags => {:user_id => user_id, :is_read => true}) 
  # }

  scope :comments, lambda { |parent_id, language_id|
    where(:language_id => language_id, :page_type => 'message', :parent_id => parent_id).
        published.ordered
  }

  scope :completed_assignments, lambda { |language_id, user_reg_date, user_id|
    by_page_type('assignment', language_id, user_reg_date).joins(:page_userflags).where(:page_userflags => {:user_id => user_id, :is_answered => true})
  }

  scope :favorite_pages, lambda { |language_id, user_reg_date, user_id|
    by_page_type('all', language_id, user_reg_date).joins(:page_userflags).where(:page_userflags => {:user_id => user_id, :is_bookmark => true})
  }

  scope :read_pages_by_page_type, lambda { |page_type, language_id, user_reg_date, user_id|
    by_page_type(page_type, language_id, user_reg_date).joins(:page_userflags).where(:page_userflags => {:user_id => user_id, :is_read => true})
  }

  # .where(:id - PageUserflag.select(:id).where({:user_id => u.id} & {:is_read => true}))
  scope :new_pages_by_page_type, lambda { |page_type, language_id, user_reg_date, user_id|
    by_page_type(page_type, language_id, user_reg_date).where("pages.id not in (select puf.page_id from page_userflags as puf where puf.user_id = #{user_id} and puf.is_read = true)")
  }

  # def self.new_pages_by_page_type(page_type, language_id, user_reg_date, user_id)
  #   (by_page_type(page_type, language_id, user_reg_date) - read_pages_by_page_type(page_type, language_id, user_reg_date, user_id))
  # end

  def self.search(search)
    unless search.empty?
      search = "%#{search.strip}%"
      joins(:article_resources).
          where(
          (:title.matches % search) | (:description.matches % search) |
              (:message_body.matches % search) | (:subtitle.matches % search) |
              {:article_resources => [:body.matches % search]}
      )
    else
      scoped
    end
  end

  def self.filter(page, filter)
    return scoped unless filter

    if filter[:status] && filter[:status] != ''
      page = case filter[:status]
               when 'FUTURE'
                 page.where(:status => 'PUBLISHED', :publish_at.gt => Time.zone.now)
               else
                 page.where(:status => filter[:status])
             end
    end
    page = page.where(:page_type => filter[:page_type]) if filter[:page_type] && filter[:page_type] != ''
    page = page.where(:author_id => filter[:author]) if filter[:author] && filter[:author] != ''
    page
  end

  # Returns pages for the given user
  def self.get_my_pages(options)
    user = options[:user]
    sort = options[:sort] || 'updated_at DESC, publish_at DESC'
    locale = options[:locale] || :en
    page = options[:page_no] || 1

    p = Page
    p = p.where(:language_id => Language.get_id_by_locale(locale)) unless user.is_admin? || user.is_super_moderator?
    p = p.where(:language_id => Language.get_id_by_locale(options[:flocale])) if options[:flocale] && !options[:flocale].empty?&& (user.is_admin? || user.is_super_moderator?)
    p = p.where(:author_id => user) unless user.is_admin? || user.is_super_moderator?
    p = p.search(options[:search]) if options[:search]
    p = p.filter(p, options[:filter]) if options[:filter]

    p.order(sort).paginate :page => page, :per_page => Page.per_page
  end

  def tags(locale)
    send "#{locale}_tag_list"
  end

  def has_questions?
    questions
  end

  def self.all_tags_strings(locale)
    tag_counts_on(:"#{locale}_tags").all.map { |e| e.name }
  end

  def self.all_tags(locale)
    result = tag_counts_on(:"#{locale}_tags").all
    if result && result.size > 0
      result = result.select { |r| Page.published.tagged_with(r.name).count > 0 }
      result.empty? ? nil : result
    else
      nil
    end
  end

  def is_assignment?
    page_type == 'assignment'
  end

  def is_read?(user)
    flags = page_userflags.where(:user_id => user.id).first rescue nil
    flags ? flags.is_read? : false
  end

  def is_bookmarked?(user)
    flags = page_userflags.where(:user_id => user.id).first rescue nil
    flags ? flags.is_bookmark? : false
  end

  def is_answered?(user)
    flags = page_userflags.where(:user_id => user.id).first rescue nil
    flags ? flags.is_answered? : false
  end

  def toggle_flag(user, flag)
    flags = page_userflags.where(:user_id => user.id).first rescue nil
    if flags
      flags.send("#{flag}=", !flags.send("#{flag}?"))
      flags.save
    else
      PageUserflag.add_flag(self, user, flag)
    end
  end

  def is_comment?
    parent_id? && page_type == 'message'
  end

  def self.get_tag_for_rav(options)
    I18n.t('stream.rav', options)
  end
end