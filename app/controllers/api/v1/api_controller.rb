class Api::V1::ApiController < ActionController::Base
  respond_to :json
  protect_from_forgery
  layout false
  before_filter :authenticate_user!

  def get_lookup_table
    begin
      table_string = params[:table]
      raise "Table #{table_string} can't be accessed" unless %w(technologies qualities languages).include?(table_string)
      table = table_string.singularize.camelize.constantize.all
      result = table
    rescue Exception => e
      result = {error: e.message}
      response.status = 500
    end
    respond_to do |format|
      format.json { render :json => result }
    end
  end

end
