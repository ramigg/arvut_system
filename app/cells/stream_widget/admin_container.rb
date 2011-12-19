module StreamWidget
  class AdminContainer < Apotomo::Widget
    # responds_to_event :presetUpdated, :with => :redraw

    after_add do |me, parent|
      
      me.root.respond_to_event :display_images, :with => :display_images, :on => me.name
      me.root.respond_to_event :display_qualities, :with => :display_qualities, :on => me.name
      me.root.respond_to_event :display_presets, :with => :display_presets, :on => me.name
      me.root.respond_to_event :display_switcher, :with => :display_switcher, :on => me.name
    end

    has_widgets do |me|
      me << widget('stream_widget/admin_stream_preset', 'admin_form', :display)
      me << widget('stream_widget/admin_stream_images', 'admin_images_form', :display)
      me << widget('stream_widget/admin_stream_switcher', 'admin_stream_switcher', :display)
      me << widget('stream_widget/admin_quality', 'admin_qualities', :display)
      me << widget('stream_widget/admin_current_state', 'current_state', :display)
    end

    def display
      set_current_preset
      if current_preset
        set_admin_display_mode('admin_stream_switcher')
      else
        set_admin_display_mode('admin_form')
      end
      render
    end
    
    def display_images
      return unless current_user.is_stream_manager? || current_user.is_admin?
      set_admin_display_mode('admin_images_form')
      replace :view  => :display
    end

    def display_qualities
      return unless current_user.is_stream_manager? || current_user.is_admin?
      set_admin_display_mode('admin_qualities')
      replace :view  => :display
    end

    def display_presets
      return unless current_user.is_stream_manager? || current_user.is_admin?
      set_admin_display_mode('admin_form')
      replace :view  => :display
    end

    def display_switcher
      set_admin_display_mode('admin_stream_switcher')
      replace :view  => :display
    end
    
  end
end