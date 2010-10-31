require 'timeout'
require 'yaml'
require 'open-uri'

module EventDataReader
  class ClassBoard
    attr_reader :classboard
    
    def initialize()
      @classboard = Cache.fetch(:content_type => 'Classboard-yml', :content_uid => '', :language_id => 0)
    end

    def classboard
      YAML::load(@classboard)
    end

    def self.store_in_cache
      begin
        Timeout::timeout(25){
          open('http://www.kab.tv/classboard/classboard-yml.php') { |f|
            Cache.store(f.read, :content_type => 'Classboard-yml', :content_uid => '', :language_id => 0)
          }
        }
      rescue Timeout::Error
      end
    end
  end
end