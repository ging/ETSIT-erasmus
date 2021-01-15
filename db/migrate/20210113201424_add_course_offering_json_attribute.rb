class AddCourseOfferingJsonAttribute < ActiveRecord::Migration[5.2]
  def change
  	change_table :project_settings do |t|
      t.json :course_offering_json
    end
  end
end
