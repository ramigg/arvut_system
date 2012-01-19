require 'feed_tools'
require 'yaml'

module FeedReader
  class Basic
    attr :feed
    
    def self.retrieve(url)
      begin
        lang_id = Language.get_id_by_locale(I18n.locale)
        Cache.fetch(:content_type => 'FeedReader', :content_uid => "#{url}", :language_id => lang_id)
      rescue
        nil
      end
    end

    def self.store_in_cache
      Language.all.each{|lang|
        locale = lang.locale.to_sym
        lang_id = Language.get_id_by_locale(locale)
        url = I18n.t('home.views.feed', :locale => locale)
        puts "FeedReader: Loading #{url}..."
        @feed = FeedTools::Feed.open(url) rescue nil
        puts "FeedReader: Loaded #{@feed ? @feed.items.count : 0} items"
        Cache.store(@feed, :content_type => 'FeedReader', :content_uid => "#{url}", :language_id => lang_id) if @feed
        puts "FeedReader: #{locale} - #{url} - stored" if @feed
      }
    end
  end
end