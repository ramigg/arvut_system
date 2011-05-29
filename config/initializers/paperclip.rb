require "paperclip"

if defined? ActionDispatch::Http::UploadedFile
  ActionDispatch::Http::UploadedFile.send(:include, Paperclip::Upfile)
end

if File.exist?('c:/Program Files/ImageMagick-6.7.0-Q16/identify.exe')
  Paperclip.options[:command_path] = 'c:/Program Files/ImageMagick-6.7.0-Q16'
elsif File.exist?('c:/Program Files/ImageMagick-6.6.7-Q16/identify.exe')
  Paperclip.options[:command_path] = 'c:/Program Files/ImageMagick-6.6.7-Q16'
elsif File.exist?('/opt/local/bin/identify')
  Paperclip.options[:command_path] = '/opt/local/bin/'
elsif File.exist?('/usr/bin/identify')
  Paperclip.options[:command_path] = '/usr/bin/'
elsif File.exist?('/usr/local/bin/identify')
  Paperclip.options[:command_path] = '/usr/local/bin/'
else
  raise 'Unable to find ImageMagic path'
end
Paperclip.options[:swallow_stderr] = false
