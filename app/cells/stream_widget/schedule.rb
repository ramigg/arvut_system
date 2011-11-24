module StreamWidget

  class Schedule < Apotomo::Widget
    include ActionView::Helpers::JavaScriptHelper

    def display
      @stream_preset = current_preset(param :stream_preset_id)
      return if @stream_preset.nil? || ! @stream_preset.show_schedule

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
      alist = CopyListing.get_day(weekday, language)
      return "<h3>#{I18n.t 'no_broadcast_on'}#{weekday}</h3>" if alist.empty?

      list = "<div class='hdr'>#{CopyDates.get_day(weekday, language)}</div><table>"
      alist.each_with_index { |item, index|
        time = sprintf("<td class='time'>%02d:%02d</td>",
        item.start_time / 100,
        item.start_time % 100)
        title = item.title.gsub '[\r\n]', ''
        title.gsub! '<div>', ''
        title.gsub! '</div>', ''
        descr = item.descr.gsub '[\r\n]', ''
        descr.gsub!(/href=([^"])(\S+)/, 'href="\1\2" ')
        descr.gsub!('target=_blank', 'class="target_blank"')
        descr.gsub!('target="_blank"', 'class="target_blank"')
        descr.gsub!('&main', '&amp;main')
        descr.gsub!('<br>', '<br/>')
        descr.gsub!(/<font\s+color\s*=\s*["\'](\w+)["\']>/, '<span style="color:\1">')
        descr.gsub!(/<font\s+color\s*=\s*["\'](#[0-9A-Fa-f]+)["\']>/, '<span style="color:\1">')
        descr.gsub!('</font>', '</span>')

        list += "<tr>#{time}<td class='title item#{index & 1}'>#{title}<br/>#{descr}</td></tr>"
      }
      list += "</table>"

      list.html_safe
    end

  end
end
