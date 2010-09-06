class InitialDatabase < ActiveRecord::Migration
  def self.up
    create_table :questionnaires do |t|
      t.string :title
      t.string :description
      t.text :related_links
      t.timestamps
      t.integer :author_id
    end

    create_table :questionnaires_questions, :id => false do |t|
      t.integer :questionnaire_id, :null => false
      t.integer :question_id, :null => false
    end

    create_table :questions do |t|
      # Foreign keys
      t.integer :author_id
      t.integer :approver_id
      
      # For single-table inheritance
      t.string :type

      # Common attributes
      t.string :title, :null => false
      t.string :description
      t.timestamps

      # Scale model
      t.integer :scale_from, :default => 1, :null => false
      t.integer :scale_to, :default => 5, :null => false
      t.string :label_from
      t.string :label_to
      
      # FreeText model
      t.boolean :is_multiline, :default => false
    end

    create_table :question_pairs do |t|
      t.string :label
      t.boolean :is_correct, :default => false
      t.integer :position
      t.integer :entry_id
      t.integer :other_id
      t.timestamps
    end
    
    
  end

  def self.down
    drop_table :questionnaires
    drop_table :questions
    drop_table :questionnaires_questions
    drop_table :question_pairs
  end
end
