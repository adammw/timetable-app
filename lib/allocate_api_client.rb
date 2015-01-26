class AllocateApiClient
  CACHE_STORE = ActiveSupport::Cache::MemoryStore.new(namespace: 'allocate_api', expires_in: 1.hour)

  CONNECTION = Faraday.new 'https://allocate.swin.edu.au/aplus/rest/timetable/' do |conn|
    conn.request :json
    conn.response :json
    conn.response :caching do
      CACHE_STORE
    end

    conn.use :instrumentation
    conn.adapter Faraday.default_adapter
  end

  def get_activities_for_unit(unitCode)
    response = CONNECTION.get("subject/#{unitCode}/activities")
    response.body
  end
end
