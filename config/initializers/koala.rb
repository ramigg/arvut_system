Koala::Facebook::OAuth.class_eval do
  def initialize_with_default_settings(*args)
    case args.size
    when 0, 1
      raise "application id and/or secret are not specified in the config" unless SocialNetworks::FACEBOOK_APP_ID && SocialNetworks::FACEBOOK_SECRET
      initialize_without_default_settings(SocialNetworks::FACEBOOK_APP_ID.to_s, SocialNetworks::FACEBOOK_SECRET.to_s, args.first)
    when 2, 3
      initialize_without_default_settings(*args)
    end
  end

  alias_method_chain :initialize, :default_settings
end
