class AddPositionDataToQuestionnairesQuestions < ActiveRecord::Migration
  def self.up
    QuestionnairesQuestion.where(:position => nil).each{|e|
      e.position = 0
      e.save
    }
  end

  def self.down
  end
end
