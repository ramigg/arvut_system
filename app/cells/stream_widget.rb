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
      me << widget('stream_widget/schedule', 'schedule', :display)
      me << widget('stream_widget/sketches', 'sketches', :display)
      me << widget('stream_widget/questions', 'questions', :display)
    end
    
    def display
      @stream_preset = Page.find(30).stream_preset # param :stream_preset
      @languages = @stream_preset.stream_items.map(&:language_id).uniq
      @current_user = param :current_user
      render
    end
  end
  
  private

  class Questions < Apotomo::Widget
    include ActionView::Helpers::JavaScriptHelper
    
    responds_to_event :more_questions, :with => :process_request
    responds_to_event :submit_question, :with => :process_submit
    
    def display
      @ask = KabtvQuestion.new
      render
    end

    def process_request
      last_question_id = (param :last_question_id).to_i

      (@questions, @total_questions) = KabtvQuestion.approved_questions(last_question_id)

      if @questions.empty?
        if last_question_id == 0
          # no questions => no questions
          render :text => '', :content_type => Mime::JS
        elsif @total_questions == 0
          # questions => no new questions
          render :text => "
            $('dl#questions').html('#{escape_javascript '<dd class="even">No questions yet.</dd>'.html_safe}');
            kabtv.questions.last_question_id = 0;
          ", :content_type => Mime::JS
        else
          render :text => '', :content_type => Mime::JS
        end
      else
        content = ''
        @questions.each_with_index {|q, idx|
          klass = ((last_question_id + 1 + idx) & 1) == 0 ? 'odd' : 'even'
          name = q.qname.empty? ? 'Guest' : q.qname
          from = q.qfrom.empty? ? 'Somewhere' : q.qfrom
          style = q.lang == 'Hebrew' ? 'style="direction:rtl"' : ''
          content += <<-HTML
            <dt class="#{klass}" #{style}><span class="who">#{name}</span> @ <span class="where">#{from}</span></dt>
            <dd class="#{klass}" #{style}>#{q.qquestion}</dd>
          HTML
        }
        if last_question_id == 0
          # no questions => questions
          render :text => "
            $('dl#questions').html('#{escape_javascript content.html_safe}');
            kabtv.questions.last_question_id = #{@questions.last.id};
          ", :content_type => Mime::JS
        else
          # questions => more questions
          render :text => "
            $('dl#questions').append('#{escape_javascript content.html_safe}');
            kabtv.questions.last_question_id =+ #{@questions.last.id};
          ", :content_type => Mime::JS
        end
      end
    end

    def process_submit
      if KabtvQuestion.ask_question(param :kabtv_question)
        message = 'Your question is awaiting approval'
      else
        message = 'Please fill "Question" field in'
      end
      render :text => "alert('#{message}');", :content_type => Mime::JS
    end
  end

  class Schedule < Apotomo::Widget
    include ActionView::Helpers::JavaScriptHelper

    def display
      @days = Date::DAYNAMES
      @schedules = {}
      language = Kabtv.map_locale_2_language(I18n.locale)
      @days.each { |weekday|
        @schedules[weekday] = generate_schedule(weekday, language)
      }
      render
    end

    private

    def generate_schedule(weekday, language)
      alist = KabtvListing.get_day(weekday, language)
      return "<h3>No broadcast on #{weekday}</h3>" if alist.empty?
      
      list = "<div class='hdr'>#{KabtvDates.get_day(weekday, language)}</div><table>"
      alist.each_with_index { |item, index|
        time = sprintf("<td class='time'>%02d:%02d</td>",
          item.start_time / 100,
          item.start_time % 100)
        title = item.title.gsub '[\r\n]', ''
        title.gsub! '<div>', ''
        title.gsub! '</div>', ''
        list += "<tr>#{time}<td class='title item#{index & 1}'>#{title}</td></tr>"
      }
      list += "</table>"

      list.html_safe
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
      text = images.empty? ? '' : "$('.images').append('#{escape_javascript images.join('').html_safe}');"
      render :text => text, :content_type => Mime::JS
    end
  end
end
