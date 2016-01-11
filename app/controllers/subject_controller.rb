class SubjectController < ApplicationController
  def index
    api_client = AllocateApiClient.new
    render json: api_client.search_for_subject(params[:query])
  end
end
