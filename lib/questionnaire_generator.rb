# To create a questionnaire run
# QuestionnaireGenerator::GenerateQuestions.run
# QuestionnaireGenerator::GenerateQuestions.unrun

module QuestionnaireGenerator

  class GenerateAnswers
    def self.run
      user = User.find(:first)
      questionnaire_answer = QuestionnaireAnswer.new
      questionnaire_answer.author = user
      questionnaire = Questionnaire.find(:first)
      questionnaire_answer.questionnaire = questionnaire
      questionnaire.questions.each{|q| 
        answer = Answer.new
        answer.question = q
        klass = QuestionnaireAnswer.map_qtype2atype(q)
        answer.resource = klass.new
        questionnaire_answer.answers << answer
        }
      questionnaire_answer.save
    end
  end
  
  class GenerateQuestions

    def self.unrun(questionnaire_id, remove_also_questions = false)
      questionnaire = Questionnaire.find(questionnaire_id)
      throw 'unrun', :message => "You have to supply an id of an existing questionnaire" if questionnaire.nil?
      if remove_also_questions
        questionnaire.questions.each { |q| q.destroy }
      end
      questionnaire.destroy
    end
    
    def self.run
      questions = []

      questions << scale(:title => 'האם אתה מרגיש שכל הארועים שמגיעים אליך מגיעים מהבורא?',
        :scale_from => 1, :scale_to => '5', :label_from => 'תמיד', :label_to => 'אף פעם'
      )                                                           
    
      questions << list(:title => 'מה השלב הראשון שאתה עובר ביחסך לחברה',
        :description => 'אז חברה אנו צריכים לקבלה שנמצאת באהבת חברים, אח"כ כמו שאני מרגיש- רע לי- אני מרגיש שאני לא רואה כך',
        :entries => [
          {:label => "מברר למה מבקש? לטובת עצמי או לטובת ה'", :is_correct => true},
          {:label => "אני לא רואה את החברים שנמצאים באהבת חברים", :is_correct => true},
          {:label => "רוצה לקבל את החברה באהבת חברים", :is_correct => true},
          {:label => "או שאני מבקש מה' תיקון שלהם או שאני מבקש תיקון שלי לראותם מתוקנים", :is_correct => false},
        ]
      )       
    
      questions << checkbox(:title => 'מה לעשות אם אתה מנסה לקבל את החברה כנמצאת באהבת חברים ולא רואה זאת בפועל?',
        :description => 'או שיהיה טוב המצב עצמו, מצבי, או לבקש שיראה שיהיה טוב, שאני אשתנה, וגם לבקש תיקון שלהם של החבר',
        :entries => [
          {:label => 'לנסות לראות את החברים כמתוקנים', :is_correct => true},
          {:label => 'לבקש מהבורא תיקון של החברים', :is_correct => false}
        ]
      )

      questions << radio(:title => 'מה לעשות אם אתה מנסה לקבל את החברה כנמצאת באהבת חברים ולא רואה זאת בפועל?',
        :description => 'או שיהיה טוב המצב עצמו, מצבי, או לבקש שיראה שיהיה טוב, שאני אשתנה, וגם לבקש תיקון שלהם של החבר',
        :other => QuestionPair.new(:label => 'נסה תשובה אחרת', :is_correct => true),
        :entries => [
          {:label => 'לנסות לראות את החברים כמתוקנים', :is_correct => true},
          {:label => 'לבקש מהבורא תיקון של החברים', :is_correct => false}
        ]
      )
      questions << free_text(:title => 'אם יש לך שאלה שעלתה לך בזמן קריאת המאמר או בשעור אנא שתף',
        :is_multiline => true
      )            

#      questions << radio(:title => 'איזה רווח מביאה לי ההשתתפות במערכת?',
#			  :entries => [
#				  {:label => 'המחשבות והרצונות שלנו מתאחדים - כולם חושבים על כולם ודואגים לכולם'},
#				  {:label => 'אנחנו מתקשרים פנימית לכוח אחד'},
#				  {:label => 'אנחנו מתחילים להרגיש את גדלות המטרה'},
#				  {:label => 'על ידי זה שכולנו חושבים ודואגים יחד, אנו מגדילים את הכוח להתקדם למטרה פי כמה וכמה'},
#				  {:label => 'כל התשובות נכונות וישנם עוד רווחים'},
#      ])
#
#      questions << radio(:title => 'למה לא מספיק אדם אחד כדי לתקן את הנשמה הכללית ונדרש ריבוי אנשים?',
#			  :entries => [
#				  {:label => 'כי אנחנו צריכים להתפרנס זה מזה'},
#				  {:label => 'כי זה נותן אפשרות ללמוד את תכונת ההשפעה, וכתוצאה מזה שמשפיעים אחד לשני לומדים איך להשפיע לבורא'},
#				  {:label => 'כי אם כל אחד נכלל מהאחרים, אז כל אחד מקבל מהם כוח גדול להשפעה'},
#				  {:label => 'כי דווקא בחברה אפשר להיפגש עם הבורא'},
#      ])
#
#      questions << radio(:title => 'מה זה "מצב רוח" ברוחניות?',
#			  :entries => [
#				  {:label => 'הרגשת שמחה'},
#				  {:label => 'הרגשת שלמות'},
#				  {:label => 'הרגשת תענוג'},
#				  {:label => 'הרגשת האמת'},
#				  {:label => ''},
#      ])
#
#      questions << radio(:title => 'למה חשוב להיות במצב רוח מרומם?',
#			  :entries => [
#				  {:label => 'כי זה קושר אותי למטרה - הרי מצב הרוח הוא דווקא כלפי המטרה'},
#				  {:label => 'כי זה מקרב אותי לשלמות'},
#				  {:label => 'כי בזה אני נותן לחברים הזדמנות להתחבר אלי'},
#				  {:label => 'כל התשובות נכונות'},
#				  {:label => 'כל התשובות לא נכונות'},
#      ])
#
#      questions << radio(:title => 'מהי דאגה בדרך ההתפתחות הרוחנית?',
#			  :entries => [
#				  {:label => 'מחשבה על כל החברים'},
#				  {:label => 'מחשבה על חבר מסוים'},
#				  {:label => 'מחשבה על המטרה'},
#				  {:label => 'מחשבה על הבורא'},
#      ])
#
#      questions << radio(:title => 'האם דאגת היום לחברים?',
#			  :entries => [
#				  {:label => 'כן'},
#				  {:label => 'לא'},
#				  {:label => 'מעכשיו אדאג'},
#				  {:label => 'כדי שאדאג לחברים, קודם החברים צריכים לדאוג לי'},
#      ])
#
#      questions << radio(:title => 'כמה פעמים במהלך היום דאגת לחברים?',
#			  :entries => [
#				  {:label => 'פעם אחת'},
#				  {:label => 'פעמיים ויותר'},
#				  {:label => 'אף פעם'},
#				  {:label => 'כל היום'},
#      ])
#
#      questions << radio(:title => 'מה גרם לך להיזכר בדאגה לחברים?',
#			  :entries => [
#				  {:label => 'חבר אחר'},
#				  {:label => 'פתאום נזכרתי'},
#				  {:label => 'עניתי על השאלון'},
#				  {:label => 'הבורא עורר אותי'},
#      ])
#
#      questions << radio(:title => 'האם רמת הדאגה שלך לחברים השתנתה לאחר מילוי השאלון?',
#			  :entries => [
#				  {:label => 'כן'},
#				  {:label => 'לא'},
#      ])
#
#      questions << radio(:title => 'אם ענית שכן, האם כעת תדאג שעוד חברים יענו על השאלון?',
#			  :entries => [
#				  {:label => 'כן'},
#				  {:label => 'לא'},
#      ])
#
      questionnaire(
        :title => 'רב"ש \'איש את רעהו יעזורו\' (16.06.10)',
        :description => '',
        :language_id => Language.get_id_by_locale('he'),
        :related_links => <<-links,
          <a target="_blank" href="http://www.kabbalah.info/eng/content/view/full/31711" class="icon_text">Article Text</a>
          <a target="blank" href="http://files.kab.co.il/video/eng_t_rav_kitvey-rb-1985-14-ani-rishon_2010-07-18_lesson_bb.wmv" class="icon_video">Lesson Video</a>
          <a target="_blank" href="http://files.kab.co.il/audio/eng_t_rav_kitvey-rb-1985-14-ani-rishon_2010-07-18_lesson_bb.mp3" class="icon_audio">Lesson Audio</a>
          links
        :questions => questions
      )
    end

    private
    @@author = User.find :first

    ['scale', 'free_text'].each do |meth|
      (class << self; self; end).class_eval do
        define_method meth do |options|
          options.merge!(:author => @@author)
          q = meth.camelcase.constantize.send :new, options
          q.save
          q
        end
      end
    end

    ['list', 'checkbox', 'radio'].each do |meth|
      (class << self; self; end).class_eval do
        define_method meth do |options|
          options.merge!(:author => @@author)
          entries = options.delete(:entries)
          throw meth, :message => "Empty entries for #{meth.to_s}" if entries.nil?
          entries.map! {|e| QuestionPair.new(e)}
          q = meth.camelcase.constantize.send :new, options
          q.entries = entries
          q.save
          q
        end
      end
    end

    (class << self; self; end).class_eval do
      define_method :questionnaire do |options|
        options.merge!(:author => @@author)
        qq = Questionnaire.send :new, options
        qq.save
        qq
      end
    end

  end
end
