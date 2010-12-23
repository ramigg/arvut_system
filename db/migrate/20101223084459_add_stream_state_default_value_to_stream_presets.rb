class AddStreamStateDefaultValueToStreamPresets < ActiveRecord::Migration
  def self.up
    StreamPreset.update_all(:stream_state_id => 1)
  end

  def self.down
  end
end
