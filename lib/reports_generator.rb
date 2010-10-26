module ReportsGenerator

  # Structure to use for results
  # user - user
  # attendance - array reflects attendance
  # total_attended - number of attended days
  class Person < Struct.new("User", :user, :attendance, :total_attended, :status); end

  class BasicReport
    #    include ActiveModel::Validations
    extend ActiveModel::Naming
    include ActiveModel::Conversion

    # Generator of basic report.
    attr_accessor :when_start, :when_end, :login, :not_logged_in, :only_confirmed, :display_profile, :answered
    
    def initialize(attributes = {})
      attributes.each do |name, value|
        send("#{name}=", value)
      end
    end

    # Setters for accessors
    [:login, :not_logged_in, :only_confirmed, :display_profile, :answered].each{|f|
      define_method("#{f}=") {|data|
        instance_variable_set("@#{f}", data.to_boolean)
      }
    }

    [:when_start, :when_end].each{|f|
      define_method("#{f}=") {|data|
        instance_variable_set("@#{f}", data.empty? ? Time.now.midnight.utc : Time.parse(data))
      }
    }

    # Accepts the following parameters:
    # when_start..when_end - Display results between specific dates both inclusive
    # logged_in - Display logged in
    # not_logged_in - Display _NOT_ logged in
    # answered - Display those who answered questionnaire
    def basic_report_by_users
      result = []

      range = @when_start .. @when_end

      all_users = User.all(:include => :activities)
      all_users = all_users.select{|u| u.confirmed?} if @only_confirmed

      return all_users.uniq.sort_by { |u| u.email } if @login && @not_logged_in

      if @login
        result += all_users.select{|u| !
          u.user_activities.map{|ua|{ua.activity.title => ua.created_at}}.
            select{|e| range.include?(e.values.first.to_time) && e.has_key?('login')}.
            empty?}
      end
      if @not_logged_in
        result += all_users.select{|u|
          u.user_activities.map{|ua|{ua.activity.title => ua.created_at}}.
            select{|e| range.include?(e.values.first.to_time)}.
            empty?}
      end
      if @answered
        result += all_users.select{|u| !
          u.user_activities.map{|ua|{ua.activity.title => ua.created_at}}.
            select{|e| range.include?(e.values.first.to_time) && e.has_key?('submit questionnaire_answer')}.
            empty?}
      end

      result.uniq.sort_by { |u| u.email }
    end

    # It means that this class is not DB based (Not ActiveRecord)
    def persisted?
      false
    end
  end

  # Generator of attendance report
  class AttendanceReport
    #    include ActiveModel::Validations
    extend ActiveModel::Naming
    include ActiveModel::Conversion

    # Setters for accessors
    [:when_start, :when_end].each{|f|
      attr_accessor f
      define_method("#{f}=") {|value|
        instance_variable_set("@#{f}", value.empty? ? Time.now.midnight.utc : Time.parse(value))
      }
    }

    [:users_group_id, :include_email, :order_by_total].each{|f|
      attr_accessor f
      define_method("#{f}=") {|value|
        instance_variable_set("@#{f}", value.to_i)
      }
    }

    def initialize(attributes = {})
      attributes.each do |name, value|
        send("#{name}=", value)
      end
    end

    def include_email?
      include_email == 1
    end

    # Accepts the following parameters:
    # month - Display results for specific month
    def attendance_report_by_users
      range = @when_start.beginning_of_day .. @when_end.end_of_day
      activity = Activity.get_activity 'submit questionnaire_answer'

      result = []
      
      if @users_group_id != 0
        # :include => [:user, {:user => :activities}]
        userlist = UserList.where(:users_group_id => @users_group_id).includes([:user, {:user => :activities}])
        userlist.all().each{|ul|
          unless ul.user.nil?
            ul.user.first_name = ul.first_name
            ul.user.last_name = ul.last_name
            user = ul.user
            has_user = true
          else
            user = ul
            has_user = false
          end
          result << fill_in_months_4user(user, range, activity.id, has_user)
        }
      else
        # All users
        User.all(:include => :user_activities).each{|user|
          result << fill_in_months_4user(user, range, activity.id)
        }
      end

      result.sort_by { |u|
        [
          order_by_total == 1 ? 100-u.total_attended : u.status,
          u.status,
          u.user[:last_name] ? u.user[:last_name] : '',
          u.user[:first_name] ? u.user[:first_name] : '',
          u.user[:email] ? u.user[:email] : '',
          100-u.total_attended,
        ]
      }
    end

    # It means that this class is not DB based (Not ActiveRecord)
    def persisted?
      false
    end

    private
    def fill_in_months_4user(user, range, activity_id, has_user = true)
      attendance = Hash.new(' ')
      total_attended = 0
      activities_in_range = user.user_activities.select { |act|
        (act.activity_id == activity_id) &&
          (range.include?(act.created_at.time))
      }

      activities_in_range.each {|a|
        day = "#{a.created_at.day}/#{a.created_at.month}"
        attendance[day] = '+'
      }
      total_attended = attendance.size
      status = has_user ? (total_attended > 0 ? '+' : '-') : 'x'
      Person.new(user, attendance, total_attended, status)
    end

  end

  # Example
  # Delayed::Job.enqueue ReportWorker.new(user)
  class ReportWorker < Struct.new(:user)
    def perform
      puts user
    end
  end
  
end
