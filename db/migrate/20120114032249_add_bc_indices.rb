class AddBcIndices < ActiveRecord::Migration
  def self.up
    execute <<-SQL
      CREATE INDEX index_button_clicks_on_created_at
        ON button_clicks
        USING btree
        (date(created_at));
      CREATE INDEX index_button_clicks_on_created_at_user_id
        ON button_clicks
        USING btree
        (date(created_at), user_id);
    SQL
  end

  def self.down
    execute <<-SQL
      DROP INDEX index_button_clicks_on_created_at;
      DROP INDEX index_button_clicks_on_created_at_user_id;
    SQL
  end
end
