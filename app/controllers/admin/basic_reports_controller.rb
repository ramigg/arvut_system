class Admin::BasicReportsController < ApplicationController
  before_filter :check_if_reports

  respond_to :html
  respond_to :xls, :js, :only => :create

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
      t(User::PROFILE_FIELDS.select { |pf| pf[:id] == 'last_name' }[0][:label]),
      t(User::PROFILE_FIELDS.select { |pf| pf[:id] == 'first_name' }[0][:label]),
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
end
