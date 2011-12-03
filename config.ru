# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment',  __FILE__)
if Rails.env.development?
   run Simulator::Application
else
  map '/internet' do
    run Simulator::Application
  end
end