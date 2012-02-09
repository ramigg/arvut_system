class StaticPagesController < ApplicationController

  layout 'static_page'

  caches_page :tv
  before_filter(:only => :tv) { @page_caching = true}

  def tv
    @preset = params[:preset]
    preset = StreamPreset.find_by_name params[:preset].humanize
    language = Language.find_by_locale params[:locale]

    pl = preset.preset_languages.where('language_id = ?', language.id).first
    @stream_url = pl.stream_items.where('is_default = TRUE').first.stream_url rescue nil
  end
end