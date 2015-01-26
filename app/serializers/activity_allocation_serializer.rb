class ActivityAllocationSerializer < ActiveModel::Serializer
  attributes :id, :url, :ical_url, :activity_ids
  has_many :activities

  def include_activity_ids?
    !includes? 'activities'
  end

  def include_activities?
    includes? 'activities'
  end

  def url
    timetable_url(object, options[:url_options])
  end

  def ical_url
    timetable_url(object, options[:url_options].merge(format: :ics))
  end

  private
  def includes?(key)
    (options[:include] || []).include?(key)
  end
end
