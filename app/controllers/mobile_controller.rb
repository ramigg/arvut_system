class MobileController < ApplicationController
  def index
    @languages = Language.all
    #
    ## Current language
    #@language_id = Language.get_id_by_locale(I18n.locale)
    #@language = Language.find(@language_id)

    # List of available events
    #@pages =  Page.by_page_type('event', @language_id, current_user.date_to_show_pages_from).ordered

    #list of available streams (according to language)
    #if @language.locale == 'ru'
    #  @video = {
    #      :host => 'wowza1.nl.kab.tv',
    #      :application => 'rtplive',
    #      :stream => 'kabtv-rus-mobile.stream'
    #  }
    #  @audio = {
    #      :host => 'wowza1.nl.kab.tv',
    #      :application => 'rtplive',
    #      :stream => 'kabtv-rus-audio.stream'
    #  }
    #elsif @language.locale == 'he'
    #  @video = {
    #      :host => 'wowza1.nl.kab.tv',
    #      :application => 'rtplive',
    #      :stream => 'tv66-heb-mobile.stream'
    #  }
    #  @audio = {
    #      :host => 'wowza1.nl.kab.tv',
    #      :application => 'rtplive',
    #      :stream => 'tv66-heb-audio.stream'
    #  }
    #else
    #  # no broadcast on these languages yet
    #  @video = @audio = nil
    #end
    #@video[:url] = get_url_for_os(@video) if @video
    #@audio[:url] = get_url_for_os(@audio) if @audio

    @streams = YAML::load( File.open( File.join(Rails.root, 'config', 'mobile-audio-streams.yml') ))
  end

  def show
    @page = Page.find(params[:id])
  end

  private
  def get_url_for_os(stream)
    return nil unless stream
    if is_3gp?
      "rtsp://#{stream[:host]}:80/#{stream[:application]}/#{stream[:stream]}"
    elsif is_ios?
      "http://#{stream[:host]}/#{stream[:application]}/mp4:#{stream[:stream]}/playlist.m3u8"
    elsif is_microsoft?
      "http://#{stream[:host]}/#{stream[:application]}/mp4:#{stream[:stream]}/Manifest"
    else
      nil
    end
  end
end
