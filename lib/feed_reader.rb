require 'feed_tools'
require 'yaml'

module FeedReader
  class Basic
    attr :feed
    
    def initialize(url, lang_id = nil, force = false)
      lang_id ||= Language.get_id_by_locale(I18n.locale)
      begin
        unless force
          @feed = Cache.fetch(:content_type => 'FeedReader', :content_uid => "#{url}", :language_id => lang_id)
        end
        unless @feed
          @feed = FeedTools::Feed.open(url)
          Cache.store(@feed, :content_type => 'FeedReader', :content_uid => "#{url}", :language_id => lang_id)
        end
      end
    end

    def self.store_in_cache
      Language.all.each{|lang|
        locale = lang.locale.to_sym
        lang_id = Language.get_id_by_locale(locale)
        url = I18n.t('home.views.feed', :locale => locale)
        @feed = FeedReader::Basic.new(url, lang_id, true).feed
        Cache.store(@feed, :content_type => 'FeedReader', :content_uid => "#{url}", :language_id => lang_id)
        puts "FeedReader: #{locale} - #{url} - stored"
      }
    end
  end
end