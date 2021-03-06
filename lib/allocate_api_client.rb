class AllocateApiClient
  ALLOCATE_ENDPOINT = ENV['ALLOCATE_BASE_URL']

  CACHE_STORE = ActiveSupport::Cache::MemoryStore.new(namespace: 'allocate_api', expires_in: 1.hour)

  FARADAY_OPTIONS = { ssl: { ca_file: Rails.root.join('config/allocate_cert.pem').to_s } }

  CONNECTION = Faraday.new("#{ALLOCATE_ENDPOINT}/rest/timetable/", FARADAY_OPTIONS) do |conn|
    conn.request  :url_encoded
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

  def get_subject(unitCode)
    response = CONNECTION.get("subject/#{unitCode}")
    response.body
  end

  def search_for_subject(query)
    response = CONNECTION.post('subjects', 'search-term' => query)
    response.body
  end
end
