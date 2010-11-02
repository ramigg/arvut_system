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
    include ActionView::Helpers::JavaScriptHelper
    
    responds_to_event :more_questions, :with => :process_request
    responds_to_event :submit, :with => :process_submit
    
    def display
      @questions = KabtvQuestion.approved_questions
      render
    end

    def process_request
      last_question_id = (param :last_question_id).to_i

      @questions = KabtvQuestion.approved_questions(last_question_id)

      if @questions.empty?
        if last_question_id == 0
          # no questions => no questions
          render :text => '', :content_type => Mime::JS
        else
          # questions => no questions
          render :text => "
            $('dl#questions').html('#{escape_javascript '<dd class="even">No questions yet.</dd>'.html_safe}');
            kabtv.questions.last_question_id = 0;
          ", :content_type => Mime::JS
        end
      else
        content = ''
        @questions.each_with_index {|q, idx|
          klass = ((last_question_id + 1 + idx) & 1) == 0 ? 'odd' : 'even'
          content += <<-HTML
            <dt class="#{klass}"><span class="who">#{q.qname}</span>, <span class="where">#{q.qfrom}</span></dt>
            <dd class="#{klass}">#{q.qquestion}</dd>
          HTML
        }
        if last_question_id == 0
          # no questions => questions
          render :text => "
            $('dl#questions').html('#{escape_javascript content.html_safe}');
            kabtv.questions.last_question_id = #{@questions.count};
          ", :content_type => Mime::JS
        else
          # questions => more questions
          render :text => "
            $('dl#questions').append('#{escape_javascript content.html_safe}');
            kabtv.questions.last_question_id =+ #{@questions.count};
          ", :content_type => Mime::JS
        end
      end
    end

    def process_submit
      
    end
  end

  class Sketches < Apotomo::Widget
    include ActionView::Helpers::JavaScriptHelper
    
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
