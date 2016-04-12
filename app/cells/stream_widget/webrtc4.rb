module StreamWidget
  class Webrtc4 < Apotomo::Widget
    include ActionView::Helpers::JavaScriptHelper
    responds_to_event :update_presets, :with => :process_request

    stream_preset = StreamPreset.new(show_schedule: true, show_sketches: true, show_questions: true)

    has_widgets do |me|
      me << widget('stream_widget/schedule', 'schedule', :display, :stream_preset => stream_preset)
      me << widget('stream_widget/sketches', 'sketches', :display, :stream_preset => stream_preset)
      me << widget('stream_widget/questions', 'questions', :display, :current_user => (param :current_user), :stream_preset => stream_preset)
    end

    def display
      @current_user = param :current_user
      @locale = params[:locale]
      @current_user = param :current_user
      @user_complain = UserComplain.new(:user => @current_user)
      render
    end
  end
end
