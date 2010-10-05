class Asset < ActiveRecord::Base
  belongs_to :page
  belongs_to :resource, :polymorphic => true
  accepts_nested_attributes_for :resource, :allow_destroy => true
  validates_associated :resource

  [:video_resource, :audio_resource, :article_resource, :question].each{|resource|
    belongs_to resource, :class_name => resource.to_s.camelize, :foreign_key => 'resource_id'
    attr_accessor resource
    const = resource.to_s.camelize.constantize
    define_method "#{resource.to_s}=" do |value|
      self.resource = const.new(value)
    end
  }

  attr_accessor :_new
  attr_accessor :resource_attributes
  before_validation :save_resource

  acts_as_list :scope => :page

  def save_resource
    const = resource_type.camelize.constantize
    if !new_record? && resource_attributes[:id]
      self.resource = const.find(resource_attributes[:id])
      self.resource.attributes = resource_attributes
    else
      self.resource = const.new(resource_attributes)
    end
  end
end
