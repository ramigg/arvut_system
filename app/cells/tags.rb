module Tags

  class Container < BaseWidget

    has_widgets do |me|
      for t in Page.all_tags(I18n.locale)
        me << widget('tags/tag', "tag-#{t.id}", :display, :tag => t.name)
      end
    end
    
    def container
      render
    end
  end

  private
  
  class Tag < BaseWidget
    def display
      @tag = param :tag
      render
    end
  end

end
