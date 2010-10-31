class EventDataController < ActionController::Base
  respond_to :js
  
  def classboard
    @images = []
    begin
      data = EventDataReader::ClassBoard.new.classboard
      url = data['urls'][1]['sketches']
      last_one = params[:total].to_i
      unless data['last-sketch'].blank?
        data['thumbnails'] << data['last-sketch']
      end
      total = data['thumbnails'].size
      sketches = (data['thumbnails'].reverse)[last_one .. total] || []
      sketches.each{ |img|
        @images << "<img alt='' src='#{url}/#{img}'></img>"
      }
    end
    #@images << "<img alt='' src='#{url}/#{data['last-sketch']}'></img>" if @images.empty?
  end

end
