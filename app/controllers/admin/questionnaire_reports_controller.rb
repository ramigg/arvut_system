#require 'csv'
class Admin::QuestionnaireReportsController < ApplicationController
  before_filter :check_if_reports

  respond_to :html, :xls, :js

  def index
    @report = ReportsGenerator::QuestionnaireReport.new
  end

  def create
    # Get data
    @report = ReportsGenerator::QuestionnaireReport.new(params[:report])
    @users = @report.questionnaire_report_by_users

    # Fields for report
    @only = [:user]
    @table_headers = [
        t('user.model.user'),
    ]

    respond_with(@users, :layout => nil, :only => @only, :headers => @table_headers) do |format|
      format.html { render :partial => 'questionnaire_report_for_users' }
      format.xls {render :partial => 'questionnaire_report_for_users'}
    end
  end

end
