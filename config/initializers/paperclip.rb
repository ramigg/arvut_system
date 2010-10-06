require "paperclip"

if File.exist?('c:/Program Files/ImageMagick-6.6.1-Q16/identify')
  Paperclip.options[:command_path] = 'c:/Program Files/ImageMagick-6.6.1-Q16'
elsif File.exist?('/opt/local/bin/identify')
  Paperclip.options[:command_path] = '/opt/local/bin/'
elsif File.exist?('/usr/bin/identify')
  Paperclip.options[:command_path] = '/usr/bin/'
else
  raise 'Unable to find ImageMagic path'
end
Paperclip.options[:swallow_stderr] = false