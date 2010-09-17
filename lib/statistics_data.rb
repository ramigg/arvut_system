module StatisticsData
  class RegVsActive
    def initialize(request)
      @basic = Statistics::Basic.new request
    end
    
    def get_period(start = nil, finish = nil)
      lang_id = Language.get_id_by_locale(I18n.locale)
      cache = Cache.where(
        :content_type => 'RegVsActive',
        :content_uid => "#{start}-#{finish}",
        :language_id => lang_id,
        :updated_at.gt => 1.day.ago).first
      return YAML.load(cache.content) if cache

      data = start.nil? ? all_period : filter_period(start, finish)

      cache =
        Cache.where(:content_type => 'RegVsActive', :content_uid => "#{start}-#{finish}", :language_id => lang_id).first || 
        Cache.new(:content_type => 'RegVsActive',:content_uid => "#{start}-#{finish}",:language_id => lang_id)
      cache.content = YAML.dump(data)
      cache.save

      data
    end

    def self.store_in_cache
      Language.all.each{|lang|
        locale = lang.locale.to_sym
        lang_id = Language.get_id_by_locale(locale)
        url = I18n.t('home.views.feed', :locale => locale)
        @feed = FeedReader::Basic.new(url, lang_id, true).feed
        cache = Cache.new(:content_type => 'FeedReader', :content_uid => "#{url}", :language_id => lang_id,
          :content => YAML.dump(@feed)
        )
        cache.save!
        puts "FeedReader: #{locale} - #{url} - stored"
      }
    end

    private

    def filter_period(start, finish)
      finish = Time.now.strftime('%Y-%m-%d')if finish.nil? # start is definitely not nil

      active = UserActivity.find_by_sql("
SELECT COUNT(*) AS active_no, CAST (created_at AS DATE) AS when
FROM (
SELECT DISTINCT ON (user_id, CAST (created_at AS DATE)) user_id, CAST (created_at AS DATE) FROM user_activities
WHERE activity_id = (SELECT id FROM activities WHERE title = 'submit questionnaire_answer')
  AND CAST (created_at AS DATE) BETWEEN '#{start}' AND '#{finish}'
) AS source
GROUP BY CAST (created_at AS DATE) ORDER BY CAST (created_at AS DATE)
        ")
      registered = User.find_by_sql("
SELECT COUNT(*) AS confirmed_no, CAST (confirmed_at AS DATE) AS when FROM users
WHERE confirmed_at IS NOT NULL
  AND CAST (confirmed_at AS DATE) BETWEEN '#{start}' AND '#{finish}'
GROUP BY CAST (confirmed_at AS DATE) ORDER BY CAST (confirmed_at AS DATE)
        ")

      regs = User.find_by_sql("
SELECT COUNT(*) AS regs FROM users
WHERE confirmed_at IS NOT NULL
  AND CAST (confirmed_at AS DATE) < '#{start}'
        ")

      join_data(active, registered, regs.first.regs.to_i)
    end
    
    def all_period
      active = UserActivity.find_by_sql('
SELECT COUNT(*) AS active_no, CAST (created_at AS DATE) AS when
FROM (
SELECT DISTINCT ON (user_id, CAST (created_at AS DATE)) user_id, CAST (created_at AS DATE) FROM user_activities
WHERE activity_id = (SELECT id FROM activities WHERE title = \'submit questionnaire_answer\')
) AS source
GROUP BY CAST (created_at AS DATE) ORDER BY CAST (created_at AS DATE)
        ')
      registered = User.find_by_sql('
SELECT COUNT(*) AS confirmed_no, CAST (confirmed_at AS DATE) AS when FROM users
WHERE confirmed_at IS NOT NULL
GROUP BY CAST (confirmed_at AS DATE) ORDER BY CAST (confirmed_at AS DATE)
        ')
      
      join_data(active, registered)
    end

    def join_data(active, registered, regs = 0)
      hash = {}
      registered.map{|a| hash[a.when] = a.confirmed_no }
      data = []
      active.each { |a|
        key = a.when
        date = @basic.revert(I18n.l Date.parse(a.when), :format => :graph)
        val = a.active_no
        regs += hash[key].to_i
        # [date, active, registered]
        data << [ date, val, regs ]
      }

      data
    end
  end
end
