require 'csv'
class Admin::BasicReportsController < ApplicationController
  before_filter :check_if_reports

  respond_to :html, :xls, :js, :only
  
  def index
    @report = ReportsGenerator::BasicReport.new
  end

  def create
    # Get data
    @report = ReportsGenerator::BasicReport.new(params[:report])
    @users = @report.basic_report_by_users

    # Fields for report
    @only = [:last_name, :first_name]
    @table_headers = [
      t('user.model.last_name'),
      t('user.model.first_name'),
    ]

    if @report.display_profile
      @only += [:email] + User::PROFILE_FIELDS.map{|m| m[:id].to_sym}
      @table_headers += [t('admin.reports.user')] + User::PROFILE_FIELDS.map{|m| t m[:label] }
    end

    # Prepare languages mapping
    @languages = []
    Language.all.each {|l|
      @languages[l.id] = l.language
    }
    @languages.compact!
    
    respond_with(@users, :only => @only, :headers => @table_headers, :type => :basic_report) do |format|
      format.html { render :partial => 'basic_report_for_users', :layout => nil }
    end
  end
  
  def generate_report
    
    clicks = User.users_clicks.all
    
    report = StringIO.new 
    CSV::Writer.generate(report, ',') do |csv|
      csv << ["email", "date", "button clicks"]
      clicks.each do |u|
        csv << [u.email, u.sdate, u.clicks]
      end
    end
    
    report.rewind   
    
    send_data(report.read, :type => 'text/csv; charset=utf-8; header=present',
      :filename => 'report.csv',:disposition => 'attachment')

  end

end
