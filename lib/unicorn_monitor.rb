SLEEP_TIME = 10
WORKER_MEMORY_LIMIT = 78_000

class UnicornMonitor
  def self.start
    puts "#{Time.now} / Starting Unicorn Monitor Daemon"

    loop do
      begin
        lines = `ps -e -www -o pid,rss,command | grep '[u]nicorn_rails worker'`.split("\n")
        lines.each do |line|
          parts = line.split(' ')
          if parts[1].to_i > WORKER_MEMORY_LIMIT
            puts "#{Time.now} / Killing Unicorn worker with pid #{parts[0].to_i}"
            ::Process.kill('QUIT', parts[0].to_i)
          end
      end
      rescue Exception => e
        puts "#{Time.now} / Got error: #{e.message}"
      end
      sleep(SLEEP_TIME)      
    end
  end

  def self.stop
    puts "#{Time.now} / Stopping Unicorn Monitor Daemon"
  end
end
