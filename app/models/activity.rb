class Activity < ActiveSupport::HashWithIndifferentAccess
  def id
    self.slice(:subject_code, :activity_group_code, :activity_code).values.join('|')
  end

  def serializable_hash
    to_hash
  end

  def read_attribute_for_serialization(key)
    respond_to?(key) ? send(key) : send(:[], key)
  end
end
