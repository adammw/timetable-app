class ActivityGroupController < ApplicationController
  def index
    api_client = AllocateApiClient.new
    render json: api_client.get_activity_groups_for_unit(params[:subject_id])
  end
end
