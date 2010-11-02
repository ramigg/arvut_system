class Kabtv < ActiveRecord::Base
  self.abstract_class = true
  establish_connection "kabtv_#{Rails.env}".to_sym
end
