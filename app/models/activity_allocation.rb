class ActivityAllocation < ActiveRecord::Base
  serialize :activity_ids
  validates :activity_ids, length: { minimum: 1, too_short: 'must have at least %{count} activity' }

  def activities
    @activities ||= begin
      api_client = AllocateApiClient.new
      units = activity_ids.map { |activity| activity.split('|').first }.uniq
      units.map do |unit|
        api_client.get_activities_for_unit(unit).slice(*activity_ids).values
      end.flatten.map { |activity| Activity.new(activity) }
    end
  end

  def activities=(activities)
    self.activity_ids = activities
  end
end
