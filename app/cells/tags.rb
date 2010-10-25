module Tags

  class Container < Apotomo::Widget

    has_widgets do |me|
      if tags = Page.all_tags(I18n.locale)
        for t in tags
          me << widget('tags/tag', "tag-#{t.id}", :display, :tag => t.name)
        end                                 
      end
    end
    
    def container
      @tags = Page.all_tags(I18n.locale)
      render
    end
  end

  private
  
  class Tag < Apotomo::Widget
    def display
      @tag = param :tag
      render
    end
  end

end
