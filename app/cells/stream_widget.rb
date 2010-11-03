module StreamWidget
  class Apotomo::Widget
    include StreamWidget::StreamHelper
    StreamHelper.instance_methods(false).each do |method|
      helper_method method
    end
  end

  class AdminContainer < Apotomo::Widget
    # responds_to_event :presetUpdated, :with => :redraw

    after_add do |me, parent|
      me.root.respond_to_event :presetUpdated, :with => :redraw, :on => me.name
    end
    
    has_widgets do |me|
      me << widget('stream_widget/admin_stream_preset', 'admin_form', :display)
      me.respond_to_event :new_preset, :with => :new, :on => 'admin_form'
      me.respond_to_event :edit_preset, :with => :edit, :on => 'admin_form'
    end
    
    def display
      @stream_presets = StreamPreset.all
      render
    end
    
    def redraw
      @stream_presets = StreamPreset.all
      render
    end
    
  end

  class AdminStreamPreset < Apotomo::Widget
    responds_to_event :submit, :with => :process_form
    

    def display
      render
    end
    
    def new
      # debugger
      @stream_preset = StreamPreset.new
      3.times do
        @stream_preset.stream_items << StreamItem.new
      end
      replace :view => :display
    end

    def edit
      # debugger
      @stream_preset = StreamPreset.find(param(:stream_preset_id))
      replace :view => :display
    end
    
    def process_form
      # debugger
      if param(:stream_preset)[:id].empty?
        @stream_preset = StreamPreset.new
      else
        @stream_preset = StreamPreset.find(param(:stream_preset)[:id]) || StreamPreset.new
      end
      if @stream_preset.update_attributes(param(:stream_preset))
        trigger :presetUpdated
        update :text => "<span style=\"color:green;font-weight:bold;\">Succesfully saved!</span>"
      else
        # replace :view => :edit        
        update :text => "Succesfully saved!"
      end
    end
    
  end

  class AdminStreamItem < Apotomo::Widget
  end

  class Container < Apotomo::Widget
    has_widgets do |me|
      me << widget('stream_widget/sketches', 'sketches', :display)
      me << widget('stream_widget/questions', 'questions', :display)
    end
    
    def display
      @stream_preset = param :stream_preset
      @current_user = param :current_user
      render
    end
  end
  
  private

  class Questions < Apotomo::Widget
    responds_to_event :more_questions, :with => :process_request
    responds_to_event :submit, :with => :process_submit
    
    def display
      @questions = KabtvQuestion.approved_questions
      render
    end

    def process_request
      
    end

    def process_submit
      replace
    end
  end

  class Sketches < Apotomo::Widget
    responds_to_event :classboard, :with => :display_classboard
    
    def display
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
      render :text => "$('.images').append('#{escape_javascript images.join('').html_safe}');", :content_type => Mime::JS
    end
  end

end
