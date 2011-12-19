require 'timeout'
require 'yaml'
require 'open-uri'

module EventDataReader
  class ClassBoard
    attr_reader :classboard
    @@cache = MemCache.new 'localhost:11211'
    
    def initialize()
      key = 'SvivaTova:Classboard-yml'
      @classboard = @@cache.get(key, true) || EventDataReader::ClassBoard.store_in_cache
      @classboard = YAML::load(@classboard)
    end

    def self.store_in_cache
      begin
        content =
          Timeout::timeout(25){
          open('http://www.kab.tv/classboard/thumbnails.yml') { |f|
            f.read
          }
        }
        key = 'SvivaTova:Classboard-yml'
        @@cache.set(key, content, 0, true)
      rescue Timeout::Error
      end

      content
    end
  end
end