class ApplicationResponder < ActionController::Responder

  def to_xls
    case options[:type]
    when :attendance_report
      attendance_report_to_xls
    when :basic_report
      basic_report_to_xls
    end
  end
  
  def basic_report_to_xls
    output = '<?xml version="1.0" encoding="UTF-8"?>
      <?mso-application progid="Excel.Sheet"?>
      <Workbook
        xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:x="urn:schemas-microsoft-com:office:excel"
        xmlns="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns:html="http://www.w3.org/TR/REC-html40"
      >
     <Styles>
      <Style ss:ID="s62">
       <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
       </Borders>
      </Style>
      <Style ss:ID="s63">
       <Alignment ss:Vertical="Bottom"/>
       <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
       </Borders>
       <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"
        ss:Bold="1"/>
       <Interior/>
       <NumberFormat/>
       <Protection/>
      </Style>
      <Style ss:ID="s64">
       <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"
        ss:Bold="1"/>
      </Style>
     </Styles>
      <Worksheet ss:Name="Sheet1"'
    output << ' ss:RightToLeft="1"' if I18n.locale == 'he'
    output << '><Table>'

    if @resource.any?
      attributes = @resource.first.attributes.keys.sort.map(&:to_sym)

      if options[:only]
        columns = Array(options[:only]) & attributes
      else
        columns = attributes - Array(options[:except])
      end

      columns += Array(options[:methods])
      if columns.any?
        unless options[:headers] == false
          output << "<Row ss:StyleID=\"s64\">"
          options[:headers].each { |header| output << "<Cell ss:StyleID=\"s63\"><Data ss:Type=\"String\">#{header}</Data></Cell>" }
          output << "</Row>\n"
        end

        @resource.each do |item|
          output << "<Row>"
          columns.each do |column|
            value = item.send(column)
            output << "  <Cell ss:StyleID=\"s62\"><Data ss:Type=\"#{value.is_a?(Integer) ? 'Number' : 'String'}\">#{value}</Data></Cell>\n"
          end
          output << "</Row>\n"
        end
      end
    end

    output << '</Table></Worksheet></Workbook>'

    render :text => output
  end

  def attendance_report_to_xls
    output = '<?xml version="1.0" encoding="UTF-8"?>
      <Workbook
        xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:x="urn:schemas-microsoft-com:office:excel"
        xmlns="urn:schemas-microsoft-com:office:spreadsheet"
        xmlns:html="http://www.w3.org/TR/REC-html40"
      >
       <Styles>
        <Style ss:ID="s62">
         <Borders>
          <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
          <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
          <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
          <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
         </Borders>
        </Style>
        <Style ss:ID="s63">
         <Alignment ss:Vertical="Bottom"/>
         <Borders>
          <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
          <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
          <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
          <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
         </Borders>
         <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"
          ss:Bold="1"/>
         <Interior/>
         <NumberFormat/>
         <Protection/>
        </Style>
        <Style ss:ID="s64">
         <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"
          ss:Bold="1"/>
        </Style>
        <Style ss:ID="s68">
         <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
         <Borders>
          <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
         </Borders>
         <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"
          ss:Bold="1"/>
        </Style>
       </Styles>
      <Worksheet ss:Name="Sheet1"'
    output << ' ss:RightToLeft="1"' if I18n.locale == 'he'
    output << '><Table>
        <Column ss:Index="6" ss:Width="10.5" ss:Span="8"/>
        <Column ss:Index="15" ss:Width="15.75" ss:Span="21"/>
    '

    if @resource.any?
      attributes = @resource.first.user.attributes.keys.sort.map(&:to_sym)

      if options[:only]
        columns = Array(options[:only]) & attributes
      else
        columns = attributes - Array(options[:except])
      end

      columns += Array(options[:methods])

      if columns.any?
        unless options[:headers] == false
          when_start = options[:date] == '' ? Time.now.midnight.utc : options[:date][0]
          when_end = options[:date] == '' ? (Time.now + 1).midnight.utc : options[:date][1]
          format = options[:type] || :attendance_report

          output << "<Row>"
          output << "<Cell ss:MergeAcross=\"4\" ss:StyleID=\"s68\"><Data ss:Type=\"String\">"
          output << "#{I18n.t('admin.reports.report')} #{I18n.t('admin.reports.for_month')} "
          output << "#{I18n.l when_start, :format => format} - #{I18n.l when_end, :format => format}"
          output << "</Data></Cell>"
          output << "</Row>\n"

          output << "<Row>"
          options[:headers].each { |header| output << "<Cell ss:StyleID=\"s64\"><Data ss:Type=\"String\">#{header}</Data></Cell>" }
          output << "<Cell ss:StyleID=\"s63\"><Data ss:Type=\"String\">#{I18n.t('admin.reports.status')}</Data></Cell>\n"
          output << "<Cell ss:StyleID=\"s63\"><Data ss:Type=\"String\">#{I18n.t('admin.reports.total')}</Data></Cell>\n"
          (when_start.to_i .. when_end.to_i).step(24 * 60 * 60) { |d|
            day = Time.at(d)
            output << "<Cell ss:StyleID=\"s63\"><Data ss:Type=\"String\">#{day.day}/#{day.month}</Data></Cell>\n"
          }
          output << "</Row>\n"
        end

        @resource.each do |item|
          output << "<Row>"
          columns.each do |column|
            value = item.user.send(column)
            output << "<Cell ss:StyleID=\"s62\"><Data ss:Type=\"#{value.is_a?(Integer) ? 'Number' : 'String'}\">#{value}</Data></Cell>\n"
          end
          output << "<Cell ss:StyleID=\"s62\"><Data ss:Type=\"String\">#{
          case item.status
          when '+'
          I18n.t('admin.reports.plus')
          when '-'
          I18n.t('admin.reports.minus')
          when 'x'
          I18n.t('admin.reports.x')
          end
          }</Data></Cell>\n"
          output << "<Cell ss:StyleID=\"s62\"><Data ss:Type=\"Number\">#{item.total_attended.to_s}</Data></Cell>\n"
          (when_start.to_i .. when_end.to_i).step(24 * 60 * 60) { |d|
            day = Time.at(d)
            at = "#{day.day}/#{day.month}"
            content = item.attendance ? item.attendance[at] : ' '
            output << "<Cell ss:StyleID=\"s62\"><Data ss:Type=\"String\">#{content}</Data></Cell>\n"
          }
          output << "</Row>\n"
        end
      end
    end

    output << '</Table>  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <FreezePanes/>
   <FrozenNoSplit/>
   <SplitHorizontal>2</SplitHorizontal>
   <TopRowBottomPane>2</TopRowBottomPane>
   <SplitVertical>5</SplitVertical>
   <LeftColumnRightPane>5</LeftColumnRightPane>
   <ActivePane>0</ActivePane>
   <ActivePane>0</ActivePane>
   <Panes>
    <Pane>
     <Number>3</Number>
    </Pane>
    <Pane>
     <Number>1</Number>
    </Pane>
    <Pane>
     <Number>2</Number>
    </Pane>
    <Pane>
     <Number>0</Number>
     <ActiveRow>0</ActiveRow>
    </Pane>
   </Panes>
   </WorksheetOptions>
</Worksheet></Workbook>'

    render :text => output
  end
end
