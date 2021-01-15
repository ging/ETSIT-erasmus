class AddCourseOfferingAttribute < ActiveRecord::Migration[5.2]
  def change
  	change_table :project_settings do |t|
      t.attachment :course_offering
    end
  end
end
