class ActivityAllocation < ActiveRecord::Base
  serialize :activity_ids

  def self.allocate_api_client
    @connection ||= Faraday.new 'https://allocate.swin.edu.au/aplus/rest/timetable/' do |conn|
      conn.request :json
      conn.response :json

      conn.use :instrumentation
      conn.adapter Faraday.default_adapter
    end
  end

  def activities
    @activities ||= begin
      units = activity_ids.map { |activity| activity.split('|').first }.uniq
      units.map do |unit|
        response = ActivityAllocation.allocate_api_client.get("subject/#{unit}/activities")
        response.body.slice(*activity_ids).values
      end.flatten.map { |activity| Activity.new(activity) }
    end
  end

  def activities=(activities)
    self.activity_ids = activities
  end
end
