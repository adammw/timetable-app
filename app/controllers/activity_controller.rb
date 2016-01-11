class ActivityController < ApplicationController
  def index
    api_client = AllocateApiClient.new
    render json: api_client.get_activities_for_unit(params[:subject_id])
  end
end
