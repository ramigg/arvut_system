namespace :lessc do
  desc "Compile all .less files from public/stylesheets"
  task(:all => :environment) do
    lessc = `bash which lessc`
    if lessc == ''
      puts 'Unable to find lessc'
      exit 1
    end
    lessc.sub!(/^\/c\//, 'c:/')
    lessc.sub!(/^\/d\//, 'd:/')
    Dir.chdir(File.dirname(lessc))
    puts "pwd: #{Dir.pwd}"

    puts 'Compiling .less files'
    pattern = "#{Rails.root}/public/stylesheets/**/[^_]*\.less"
    Dir.glob(pattern) {|file|
      src = file
      dest = "#{File.dirname(file)}/#{File.basename(file,'.less')}.css"
      res = `../../node.js/node lessc -x #{src} #{dest}`
      log "#{src} => #{dest}"
    }
  end
end

def log(title = '')
  print "#{title}--\n"
end

