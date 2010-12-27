class AddConstraintsToStreamImages < ActiveRecord::Migration
  def self.up
    execute "alter table stream_images add constraint language_id_stream_state_id_key unique(language_id, stream_state_id)"
  end

  def self.down
    execute "alter table locations_subscriptions drop constraint language_id_stream_state_id_key"
  end
end
