class StaticPagesController < ApplicationController

  layout 'static_page'

  caches_page :tv
  before_filter(:only => :tv) { @page_caching = true}

  class Request
    attr_accessor :parameters

    def initialize(parameters)
      self.parameters = parameters
    end

    def symbolized_path_parameters
      { :controller => 'static_pages', :action => 'tv'}
    end

    def session; nil end
    def script_name; '' end
    def protocol; '' end
    def host_with_port; '' end
  end

  def tv(preset = nil, locale = nil, do_render = false)
    @preset = preset || params[:preset]
    preset = StreamPreset.find_by_name @preset.humanize
    language = Language.find_by_locale(locale || params[:locale])

    pl = preset.preset_languages.where('language_id = ?', language.id).first
    @stream_url = pl.stream_items.where('is_default = TRUE').first.stream_url rescue nil

    if do_render
      @page_caching = true
      self.request = Request.new(
          HashWithIndifferentAccess.new(
            :controller => 'static_pages',
            :action => 'tv',
            :locale => locale,
            :preset => preset
          )
      )
      render_to_string(:action => 'static_pages/tv')
    end
  end
end