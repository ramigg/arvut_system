module StreamWidget

  class Admin < Apotomo::Widget
    responds_to_event :submit, :with => :process_form
    
    def display_form
      # debugger
      @stream_preset = StreamPreset.find_or_initialize_by_id(param(:stream_preset))
      render
    end
    
    def process_form
      replace :view => :display_form
    end
    
  end

  class Container < Apotomo::Widget
    has_widgets do |me|
      me << widget('stream_widget/sketches', 'sketches', :display)
    end
    
    
    def display
      @stream_preset = param :stream_preset
      @current_user = param :current_user
      render
    end
  end
  
  private

  class Sketches < Apotomo::Widget
    responds_to_event :classboard, :with => :display_classboard
    
    def display
      render
    end

    def display_classboard
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
      render
    end
  end

end
