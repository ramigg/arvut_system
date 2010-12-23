module StreamWidget
  class Sketches < Apotomo::Widget
    responds_to_event :classboard, :with => :display_classboard

    def display
      return unless current_preset.show_sketches

      render
    end

    def display_classboard
      images = []
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
          images << "<img alt='' src='#{url}/#{img}'></img>"
        }
      end
      text = images.empty? ? '' : "$('.images').append('#{escape_javascript images.join('').html_safe}');"
      render :text => text, :content_type => Mime::JS
    end
  end
end
