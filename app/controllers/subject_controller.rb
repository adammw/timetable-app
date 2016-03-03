class SubjectController < ApplicationController
  def index
    render json: api_client.search_for_subject(params[:query])
  end

  def show
    render json: api_client.get_subject(params[:id])
  end

  private

  def api_client
    @api_client ||= AllocateApiClient.new
  end
end
