module StreamWidget

  private

  class Questions < Apotomo::Widget
    include ActionView::Helpers::JavaScriptHelper
    include ActionView::Helpers::AssetTagHelper
    alias_method(:controller, :parent_controller)

    responds_to_event :more_questions, :with => :process_request
    responds_to_event :submit_question, :with => :process_submit

    def display
      @stream_preset = (param :stream_preset) || current_preset(param :stream_preset_id)
      return if @stream_preset.nil? || ! @stream_preset.show_questions

      current_user = param :current_user
      @ask = CopyQuestion.new
      @ask.qname = [current_user.first_name, current_user.last_name].join(' ') rescue ''
      @ask.qfrom = [current_user.location.city, current_user.region.name, current_user.country.name].join(', ') rescue ''
      render
    end

    def process_request
      last_question_id = (param :last_question_id).to_i

      (@questions, @total_questions) = CopyQuestion.approved_questions(last_question_id)

      if @questions.empty?
        if last_question_id == 0 || @total_questions == 0
          # questions => no new questions
          text = "
          $('dl#questions').html('#{escape_javascript "<dd class='even'>#{I18n.t 'kabtv.kabtv.no_questions_yet'}</dd>".html_safe}');
          kabtv.questions.last_question_id = 0;
          "
        else
          text = ''
        end
      else
        content = ''
        @questions.each_with_index {|q, idx|
          klass = ((last_question_id + 1 + idx) & 1) == 0 ? 'odd' : 'even'
          name = q.qname.empty? ? I18n.t('kabtv.kabtv.guest') : q.qname
          from = q.qfrom.empty? ? I18n.t('kabtv.kabtv.somewhere') : q.qfrom
          style = q.lang == 'Hebrew' ? 'style="direction:rtl"' : ''
          if q.stimulator_id.to_i > 0
            user = User.find(q.stimulator_id)
            img = "<img src='#{image_path user.avatar_url(:thumb)}' />"
          else
            img = "<img src='#{image_path 'user.png'}' />"
          end

          content += <<-HTML
          <dt class="#{klass}" #{style}>#{img}<span class="who">#{name}</span> @ <span class="where">#{from}</span></dt>
          <dd class="#{klass}" #{style}>#{q.qquestion}</dd>
          HTML
        }
        if last_question_id == 0
          # no questions => questions
          text = "
          $('dl#questions').html('#{escape_javascript content.html_safe}');
          kabtv.questions.last_question_id = #{@questions.last.id};
          "
        else
          # questions => more questions
          text = "
          $('dl#questions').append('#{escape_javascript content.html_safe}');
          kabtv.questions.last_question_id =+ #{@questions.last.id};
          "
        end
      end

      render :text => text, :content_type => Mime::JS
    end

    def process_submit
      if CopyQuestion.ask_question(param(:kabtv_question), param(:current_user))
        message = I18n.t 'kabtv.kabtv.awaiting_for_approval'
        render :text => "alert('#{message}');", :content_type => Mime::JS
      else
        message = I18n.t 'kabtv.kabtv.no_question'
        render :text => "kabtv.questions.toggleAskAndQuestions();alert('#{message}');", :content_type => Mime::JS
      end
    end
  end
end
