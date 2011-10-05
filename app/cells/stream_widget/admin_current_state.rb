module StreamWidget
  class AdminCurrentState < Apotomo::Widget
    
    after_add do |me, parent|
      me.root.respond_to_event :update_current_state, :with => :redraw, :on => me.name
    end

    def display
      render
    end
    
    def redraw
      @push_to_commet = true
      replace :view => :display
    end
    
  end
end
