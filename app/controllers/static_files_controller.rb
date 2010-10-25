class StaticFilesController < ActionController::Metal
  
  include ActionController::Streaming
  
  def get_htc
    send_file "#{Rails.root}/public/stylesheets/PIE.htc", :disposition => 'inline', :type => 'text/x-component'
  end

end
