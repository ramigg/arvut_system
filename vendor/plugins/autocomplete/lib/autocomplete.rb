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
      ref_labels = options[:ref] || []
      select_fields = [labels] + ref_labels.map{|rl| "#{rl.keys[0]}_id"}
      select_fields = "DISTINCT id, #{select_fields.join(', ')}"
      order_clause = options[:order] || labels.map{|l| l.to_s }.join(', ')

      define_method("autocomplete_#{object}_#{method}") do

        unless params[:term] && params[:term].empty?
          where_clause = labels.map{|l|
            "#{l} ILIKE '#{options[:full] ? '%' : ''}#{params[:term]}%'"
          }.join(' OR ')

          if params[:additional]
            where_clause = "(#{where_clause}) AND (#{params[:additional]} = #{params[params[:additional]]})"
          end
          items = object.to_s.camelize.constantize.select(select_fields).
            where(where_clause).
            limit(limit_clause).order(order_clause)
        else
          items = {}
        end

        render :json => json_for_autocomplete(items, method, labels, ref_labels)
      end
    end
  end

  private
  def json_for_autocomplete(items, method, labels, ref_labels = nil)
    items.collect {|item|
      p1 = labels.collect {|label|
        item[label] || "no-#{label}"
      }.join(', ')
      p2 = ref_labels.collect {|ref|
        key = ref.keys[0]
        val = ref[key]
        c = item.send key
        c.send val if c
      }.join(', ')
      value = [p1, p2].join(', ')
      {"id" => item.id, "label" => value, "value" => item[method]}
    }
  end
end
