require 'google_visualization'

module Statistics

  class Basic
    @@packages = ['corechart']
    
    def self.script
      script = <<-SCRIPT
<!-- Load the Google Visualization AJAX API
    In the case of IE load also HTML5 corrector -->
<!--[if IE]>
<script type="text/javascript" src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script type="text/javascript" src="http://www.google.com/jsapi?autoload=%7B%22modules%22%3A%5B%7B%22name%22%3A%22visualization%22%2C%22version%22%3A%221%22%2C%22packages%22%3A%5B%22areachart%22%2C%22corechart%22%5D%7D%5D%7D"></script>
      SCRIPT
      script.html_safe
    end

    def initialize(request)
      @is_firefox ||= /Firefox\/([\d.]+)$/.match(request.env['HTTP_USER_AGENT'])
      @version ||= $1
      @perform_revert ||= @is_firefox && I18n.locale == :he # ignore version for now
    end

    def revert(data)
      if @perform_revert
        data = data.mb_chars.split(/\s/).collect { |str|
          /^\d+$/.match(str) ? str : str.reverse
        }.join(' ')
      end
      ' ' + data + ' '
    end
  end
  
  class AreaChart < Basic
    
    def initialize(data, options = {})
      @data = data
      @options = options
    end

    def render
      # Create data table
      # Instantiate and draw chart, passing in some options
      "#{data_source} #{visualize}"
    end

    private
    def data_source
      data_table = DataTable.new

      columns = @options.delete(:columns) || []
      columns.each {|column|
        data_table.add_column DataColumn.new(column[:type], column[:label])
      }

      @data.each { |data| data_table.add_row data }
      
      "var data = new google.visualization.DataTable(#{data_table.to_json});\n"
    end

    def visualize
      target = @options.delete(:target) || '#chart_div'
      draw_options = @options.delete(:draw_options) || []
      <<-JS
var chart = new google.visualization.AreaChart($('#{target}')[0]);
chart.draw(data, #{draw_options.to_json});
      JS
    end
  end
end