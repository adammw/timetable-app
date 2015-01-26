class ActivityAllocationController < ApplicationController
  def new
  end

  def show
    AllocateApiClient::CACHE_STORE.clear if params[:purge].present?

    expires_in 1.day, public: true
    respond_to do |format|
      format.json { render json: activity_allocation, root: :timetable, url_options: default_url_options, include: includes_params }
      format.ics do
        @allocation = activity_allocation
        @activities = activity_allocation.activities
      end
    end
  end

  def create
    render json: ActivityAllocation.create(activity_allocation_params), root: :timetable, url_options: default_url_options
  end

  private

  def activity_allocation
    @activity_allocation ||= ActivityAllocation.find(params[:id])
  end

  def activity_allocation_params
    params.permit(activities: Parameters.array(Parameters.string))
  end

  def includes_params
    params[:includes].try(:split, ',') || []
  end
end
