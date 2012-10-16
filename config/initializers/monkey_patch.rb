class String
  def is_binary_data?
    ( self.count( "^ -~", "^\r\n" ).fdiv(self.size) > 0.3 ||
      self.index( "\x00" ) ) unless empty?
  end
end

class ERB
  module Util
    def html_escape(s)
      s = s.to_s
      if s.html_safe?
        s
      else
        s.gsub(/[&"'><]/, HTML_ESCAPE).html_safe
      end
    end

    alias h html_escape

    singleton_class.send(:remove_method, :html_escape)
    module_function :html_escape, :h
  end
end