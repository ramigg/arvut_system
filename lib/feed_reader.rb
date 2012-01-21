require 'feedzirra'

module FeedReader
  class Base
    attr :feed

    def self.retrieve(url)
      Cache.fetch(:content_type => 'FeedReader', :content_uid => "#{url}") rescue nil
    end

    def self.store_in_cache
      feed_urls = Language.all.map { |lang|
        locale = lang.locale.to_sym
        lang_id = Language.get_id_by_locale(locale)
        url = I18n.t('home.views.feed', :locale => locale) rescue ''
      }
      feeds = Feedzirra::Feed.fetch_and_parse(feed_urls)
      feeds.each { |feed_res|
        url = feed_res[0]
        feed = feed_res[1]
        next unless feed && feed != 0
        puts "FeedReader: Loaded #{feed ? feed.entries.count : 0} entries"

        Cache.store(feed.entries, :content_type => 'FeedReader', :content_uid => "#{url}")
        puts "FeedReader: #{feed.title} - #{url} - stored"
      }
    end
  end
end