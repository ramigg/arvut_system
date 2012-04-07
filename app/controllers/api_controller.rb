class ApiController < AdminApplicationController
  skip_before_filter :verify_authenticity_token

  def update_mobile_token
      #update table of devices with the registration id
    registration = params[:registration_id]
    user_id = current_user.id
    device = C2dm::Device.create(:registration_id => registration)

    device.update_attribute(:user_id=> user_id)

    # device id will be the unique device id of the user
    # registartion id is what the client got from registarion of the notifiaction server

  end
  def push_notification_message
    #need to get out the registartion id from the device table per user
    user_id = current_user.id
     device = C2dm::Device.find_by_name(user_id)


     notification = C2dm::Notification.new
     notification.device = device
     notification.collapse_key = "private_message"
     notification.delay_while_idle = true
     notification.data = {"sender_id" => "420", "message_text" => "Wanna go for a ride?"}
     notification.save
     C2dm::Notification.send_notifications(notification)

  end
end

#need more to:
# route to api controller      - done
# migrate colomn of userid in device table - done
# extract  notifications tokens on sending message
#implement android side to login/update token
