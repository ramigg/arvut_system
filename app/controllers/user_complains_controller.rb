class UserComplainsController < ApplicationController
  def create
    @complain = UserComplain.new(params[:user_complain])
    if @complain.save
      email = Mailer.send_problem_notification @complain, request.remote_ip, @locale
      email.deliver rescue ''
    else
      render :text => "alert('#{I18n.t "kabtv.kabtv.submit_problem"}');", :content_type => Mime::JS
      return
    end
    render :text => "alert('#{I18n.t "kabtv.kabtv.thank_you"}');$('#user_complain_message').val('')", :content_type => Mime::JS
  end
end
