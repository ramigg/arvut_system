class ApiController < AdminApplicationController


  def update_mobile_token

      #update table of devices with the registration id
    registration = params[:registration_id]

    device = C2dm::Device.create(:registration_id => registration,:user_id=> @user.id)

   # device.update_attribute(:user_id=> @user.id)


    # device id will be the unique device id of the user
    # registartion id is what the client got from registarion of the notifiaction server

  end
  def push_notification_message
    #need to get out the registartion id from the device table per user
    user_id = @user.id
     device = C2dm::Device.find_by_name(user_id)


     notification = C2dm::Notification.new
     notification.device = device
     notification.collapse_key = "private_message"
     notification.delay_while_idle = true
     notification.data = {"sender_id" => "420", "message_text" => "Wanna go for a ride?"}
     notification.save
     C2dm::Notification.send_notifications(notification)

  end

  def getStreams
    #@locale = params[:locale]

    #@language_id = Language.get_id_by_locale(@locale)
    #page = Page.by_page_type("event", @language_id, current_user.date_to_show_pages_from)
    response = Hash.new
    #{
    #    "locale":{
    #    "language":null,
    #"pages":{
    #    "state":null,
    #    "description":null,
    #    "title":null,
    #    "urls":[
    #     {
    #       "url_quality":null,
    #        "url_title":null,
    #        "url_value":null
    #     }
    #
    #    ]
    #}
    #}
    #}
    #return {"locale"=> {"language"=>"null","pages"=>{"state"=>"null","description"=>"null"
    #,"title"=>"null","urls"=>{"url_quality"=>"null","url_title"=>"null","url_value"=>"null"}}}}




  end
end

#need more to:
# route to api controller      - done
# migrate colomn of userid in device table - done
# extract  notifications tokens on sending message
#implement android side to login/update token
