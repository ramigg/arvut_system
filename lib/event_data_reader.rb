require 'timeout'
require 'yaml'
require 'open-uri'

module EventDataReader
  class ClassBoard
    attr_reader :classboard
    
    def initialize()
      @classboard = Cache.fetch(:content_type => 'Classboard-yml', :content_uid => '', :language_id => 0)
      unless @classboard
        @classboard = EventDataReader::ClassBoard.store_in_cache
      end
    end

    def self.store_in_cache
      begin
        content =
          Timeout::timeout(25){
          open('http://www.kab.tv/classboard/thumbnails.yml') { |f|
            YAML::load(f)
          }
        }
        Cache.store(content, :content_type => 'Classboard-yml', :content_uid => '', :language_id => 0)
      rescue Timeout::Error
      end
      content
    end
  end
end