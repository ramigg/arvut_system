#require 'csv'
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
      @only += [:email] + User::PROFILE_FIELDS.map { |m| m[:id].to_sym }
      @table_headers += [t('admin.reports.user')] + User::PROFILE_FIELDS.map { |m| t m[:label] }
    end

    # Prepare languages mapping
    @languages = []
    Language.all.each { |l|
      @languages[l.id] = l.language
    }
    @languages.compact!

    respond_with(@users, :only => @only, :headers => @table_headers, :type => :basic_report) do |format|
      format.html { render :partial => 'basic_report_for_users', :layout => nil }
    end
  end

  def generate_report

    report = User.users_clicks.all.to_excel(
        :title => "WE-Report #{Time.now.strftime("%Y-%m-%d")}",
        :author => 'BB',
        :company => 'BB',
        :only => [:email, :name, :sdate, :clicks, :button_click_set],
        :headers => {:sdate => "date", :clicks => "button clicks", :button_click_set => "button clicks setting"}
    )

    send_zip_file 'WE-Report', report
  end

  private
  
  require 'zip/zip'

  def send_zip_file(file_name, content)
    time_now = Time.now

    file_path = "#{Rails.root}/tmp/#{file_name}_#{time_now.strftime("%d-%m-%Y")}_#{Process.pid}.xml"
    zip_file_path = "#{Rails.root}/tmp/#{file_name}_#{time_now.strftime("%d-%m-%Y")}_#{Process.pid}.zip"
    File.unlink file_path rescue nil
    File.unlink zip_file_path rescue nil
    my_file = File.new(file_path, 'w+')
    my_file.syswrite(content)
    my_file.close
    Zip::ZipFile.open(zip_file_path, 'w') do |zipfile|
      zipfile.add(File.basename(file_path), my_file.path)
    end
    send_file(zip_file_path, :type => 'application/zip')
  end
end
