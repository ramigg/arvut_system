# This is generic cache mechanism to store and retrieve data from DB
# Each entry is described using the following fields:
# * content_type - (string) describes model/class/kind of an object
# * content_uid - (string) unique ID of an entry
# * language_id - (numeric) ID of a language the entry belongs to
# Content of an entry is stored in field 'content'

class Cache < ActiveRecord::Base
  def self.fetch(options)
    begin
      cache = Cache.where(options).first
      data = YAML.load(cache.content) if cache
    end
    data
  end

  def self.store(content, options)
    begin
      cache = Cache.where(options).first || Cache.new(options)
      cache.content = YAML.dump(content)
      cache.save
    end
  end
end