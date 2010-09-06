class String
  def to_boolean
    self == 'true' ? true : false
  end
end
class NilClass
  def to_boolean
    false
  end
  def empty?
    true
  end
end
class FalseClass
  def to_boolean
    false
  end
end
class Fixnum
  def empty?
    false
  end
end
class Array
   def find_dups
      inject(Hash.new(0)) { |h,e| h[e] += 1; h }.select { |k,v| v > 1 }.collect { |x| x.first }
   end
end

# Look for dictionaries in nested directories
#I18n.load_path << Dir[File.join(Rails.root, 'config', 'locales', '**', '*.{rb,yml}')]

# Use English in case of there is no translation in the current locale
I18n::Backend::Simple.send(:include, I18n::Backend::Fallbacks)

# cache all responses from the backend
I18n::Backend::Simple.send(:include, I18n::Backend::Cache)
I18n.cache_store = ActiveSupport::Cache.lookup_store(:memory_store)

require 'date'
def days_in_month(year, month)
  (Date.new(year, 12, 31) << (12-month)).day
end
