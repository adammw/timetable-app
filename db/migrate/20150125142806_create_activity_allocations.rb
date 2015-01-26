class CreateActivityAllocations < ActiveRecord::Migration
  def change
    create_table :activity_allocations, id: :uuid do |t|
      t.string :activity_ids, null: false, default: ''
      t.timestamps null: false
    end
  end
end
