class Admin::AttendanceReportsController < ApplicationController
  before_filter :check_if_reports

  respond_to :html
  respond_to :xls, :js, :only => :create
  
  def index
    @report = ReportsGenerator::AttendanceReport.new
  end

  def create
    # Get data
    @report = ReportsGenerator::AttendanceReport.new(params[:report])
    @users = @report.attendance_report_by_users

    # Fields for report
    @only = [:last_name, :first_name] + (@report.include_email? ? [:email] : [])
    @table_headers = [
      t(User::PROFILE_FIELDS.select { |pf| pf[:id] == 'last_name' }[0][:label]),
      t(User::PROFILE_FIELDS.select { |pf| pf[:id] == 'first_name' }[0][:label]),
      @report.include_email? ? t('admin.reports.user') : nil
    ].compact

    respond_with(@users, :only => @only, :headers => @table_headers, :date => @report.date, :type => :attendance_report) do |format|
      format.html { render :partial => 'attendance_report_for_users', :layout => nil }
    end
  end
end
