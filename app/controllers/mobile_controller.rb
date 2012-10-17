class MobileController < ApplicationController
  def index
    @languages = Language.all
    @streams = MobilePreset.get_streams_array(@languages)
    #@streams = YAML::load( File.open( File.join(Rails.root, 'config', 'mobile-audio-streams.yml') ))
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
