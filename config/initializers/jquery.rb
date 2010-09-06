# Switch the javascript_include_tag :defaults to use jquery instead of
# the default prototype helpers.
if ActionView::Helpers::AssetTagHelper.const_defined?(:JAVASCRIPT_DEFAULT_SOURCES)
  ActionView::Helpers::AssetTagHelper.send(:remove_const, "JAVASCRIPT_DEFAULT_SOURCES")
end
ActionView::Helpers::AssetTagHelper::JAVASCRIPT_DEFAULT_SOURCES = ['jquery-1.4.2.min', 'rails']
module ActionView
  module Helpers
    module AssetTagHelper
      def self.reset_javascript_include_default #:nodoc:
        @@javascript_expansions[:defaults] = JAVASCRIPT_DEFAULT_SOURCES.dup
      end
    end
  end
end

ActionView::Helpers::AssetTagHelper::reset_javascript_include_default
