require 'active_support/concern'

module Autocomplete
  extend ActiveSupport::Concern

  # Inspired on DHH's autocomplete plugin
  #
  # Usage:
  #
  # class ProductsController < Admin::BaseController
  #   autocomplete :brand, :name
  # end
  #
  # This will magically generate an action autocomplete_brand_name, so,
  # don't forget to add it on your routes file
  #
  #   resources :products do
  #      get :autocomplete_brand_name, :on => :collection
  #   end
  #
  # Now, on your view, all you have to do is have a text field like:
  #
  #   f.text_field :brand_name, :autocomplete => autocomplete_brand_name_products_path
  #
  # For full description see README
  #
  module ClassMethods
    def autocomplete(object, method, options = {})
      limit_clause = options[:limit] || 10
      labels = [method] + (options[:add_also] || [])
      order_clause = options[:order] || labels.map{|l| l.to_s }.join(', ')

      define_method("autocomplete_#{object}_#{method}") do

        unless params[:term] && params[:term].empty?
          where_clause = labels.map{|l|
            "#{l} ILIKE '#{options[:full] ? '%' : ''}#{params[:term]}%'"
          }.join(' OR ')
          
          items = object.to_s.camelize.constantize.where(where_clause).
            limit(limit_clause).order(order_clause)
        else
          items = {}
        end

        render :json => json_for_autocomplete(items, method, labels)
      end
    end
  end

  private
  def json_for_autocomplete(items, method, labels)
    items.collect {|i|
      value = labels.collect {|l|
        i[l]
      }.join(', ')
      {"id" => i.id, "label" => value, "value" => i[method]}
    }
  end
end
