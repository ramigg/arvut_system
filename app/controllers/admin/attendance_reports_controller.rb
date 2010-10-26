class Admin::AttendanceReportsController < ApplicationController
  before_filter :check_if_reports

  respond_to :html, :xls, :js
  
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
      t('user.model.last_name'),
      t('user.model.first_name'),
      @report.include_email? ? t('admin.reports.user') : nil
    ].compact

    respond_with(@users, :only => @only, :headers => @table_headers, :date => [@report.when_start, @report.when_end], :type => :attendance_report)
  end
end
