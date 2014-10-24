module SecretBroadcast
  CONFIG = YAML.load_file(Rails.root.join("config/secret_broadcast.yml"))
  PAGES = CONFIG['pages']
end
