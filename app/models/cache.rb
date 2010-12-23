# This is generic cache mechanism to store and retrieve data from DB
# Each entry is described using the following fields:
# * content_type - (string) describes model/class/kind of an object
# * content_uid - (string) unique ID of an entry
# * language_id - (numeric) ID of a language the entry belongs to
# Content of an entry is stored in field 'content'

class Cache
  def self.fetch(options)
    cache = Rails.cache.read(Cache.make_key(options))
    data = YAML.load(cache) if cache
    data
  end

  def self.store(content, options)
    Rails.cache.write(Cache.make_key(options), YAML.dump(content))
  end

  private
  def self.make_key(options)
    a = []
    options.each{|k, v| a << "#{k}=#{v}"}
    a.sort.join(',')
  end
end