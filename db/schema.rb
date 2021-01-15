# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_13_201424) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "unaccent"

  create_table "languages", force: :cascade do |t|
    t.string "name"
    t.boolean "currently_studying"
    t.boolean "able_follow_lectures"
    t.boolean "able_follow_lectures_extra_preparation"
    t.bigint "student_application_form_id"
    t.index ["student_application_form_id"], name: "index_languages_on_student_application_form_id"
  end

  create_table "learning_agreement_subjects", force: :cascade do |t|
    t.integer "code"
    t.string "subject"
    t.string "degree"
    t.float "ects"
    t.bigint "user_id"
    t.index ["user_id"], name: "index_learning_agreement_subjects_on_user_id"
  end

  create_table "nominated_users", force: :cascade do |t|
    t.string "name"
    t.string "university"
    t.string "period"
    t.string "email"
    t.string "registration_token"
    t.index ["registration_token"], name: "index_nominated_users_on_registration_token", unique: true
  end

  create_table "project_settings", force: :cascade do |t|
    t.string "academic_years", default: "[\"2018-2019: Spring Semester\", \"2019-2020: Fall Semester\", \"2019-2020: Spring Semester\", \"2019-2020: Academic Year\"]"
    t.string "current_academic_year", default: "2018-19"
    t.string "next_academic_year", default: "2019-20"
    t.string "deadline_first_semeter", default: "June, 1st"
    t.string "deadline_second_semester", default: "December, 1st"
    t.string "deadline_double_degree", default: "May, 15th"
    t.string "mobility_programmes", default: "[\"Erasmus+ Studies\", \"Erasmus+ Placement\", \"Magalhães\", \"Bilateral Agreement\", \"Visiting Student\", \"SICUE/SENECA\", \"Other\"]"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "course_offering_file_name"
    t.string "course_offering_content_type"
    t.integer "course_offering_file_size"
    t.datetime "course_offering_updated_at"
    t.json "course_offering_json"
  end

  create_table "student_application_forms", force: :cascade do |t|
    t.integer "step", default: 1
    t.string "inst_sending_name", default: ""
    t.string "inst_adress"
    t.string "school_family_dpt"
    t.string "erasmus_code"
    t.string "dept_coordinator"
    t.string "contact_person"
    t.string "inst_telephone"
    t.string "inst_email"
    t.string "academic_year", default: ""
    t.string "programme"
    t.string "field_of_study"
    t.string "purpose_of_stay"
    t.string "other_purpose"
    t.string "mother_tongue"
    t.string "language_instruction"
    t.string "current_diploma_degree"
    t.string "year_attended"
    t.string "specialization_area"
    t.boolean "already_study_abroad"
    t.string "where_study_abroad"
    t.string "where_institution_abroad"
    t.boolean "no_work_experience"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_student_application_forms_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "first_name"
    t.string "family_name"
    t.date "birth_date"
    t.string "born_place"
    t.string "nationality"
    t.string "sex"
    t.string "permanent_adress"
    t.string "phone_number"
    t.boolean "seeking_degree", default: false
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "signed_student_application_form_file_name"
    t.string "signed_student_application_form_content_type"
    t.integer "signed_student_application_form_file_size"
    t.datetime "signed_student_application_form_updated_at"
    t.string "motivation_letter_file_name"
    t.string "motivation_letter_content_type"
    t.integer "motivation_letter_file_size"
    t.datetime "motivation_letter_updated_at"
    t.string "curriculum_vitae_file_name"
    t.string "curriculum_vitae_content_type"
    t.integer "curriculum_vitae_file_size"
    t.datetime "curriculum_vitae_updated_at"
    t.string "transcript_of_records_file_name"
    t.string "transcript_of_records_content_type"
    t.integer "transcript_of_records_file_size"
    t.datetime "transcript_of_records_updated_at"
    t.string "learning_agreement_file_name"
    t.string "learning_agreement_content_type"
    t.integer "learning_agreement_file_size"
    t.datetime "learning_agreement_updated_at"
    t.string "valid_insurance_policy_file_name"
    t.string "valid_insurance_policy_content_type"
    t.integer "valid_insurance_policy_file_size"
    t.datetime "valid_insurance_policy_updated_at"
    t.string "ni_passport_file_name"
    t.string "ni_passport_content_type"
    t.integer "ni_passport_file_size"
    t.datetime "ni_passport_updated_at"
    t.string "photo_file_name"
    t.string "photo_content_type"
    t.integer "photo_file_size"
    t.datetime "photo_updated_at"
    t.string "recommendation_letter_1_file_name"
    t.string "recommendation_letter_1_content_type"
    t.integer "recommendation_letter_1_file_size"
    t.datetime "recommendation_letter_1_updated_at"
    t.string "recommendation_letter_2_file_name"
    t.string "recommendation_letter_2_content_type"
    t.integer "recommendation_letter_2_file_size"
    t.datetime "recommendation_letter_2_updated_at"
    t.string "official_gpa_file_name"
    t.string "official_gpa_content_type"
    t.integer "official_gpa_file_size"
    t.datetime "official_gpa_updated_at"
    t.string "english_test_score_file_name"
    t.string "english_test_score_content_type"
    t.integer "english_test_score_file_size"
    t.datetime "english_test_score_updated_at"
    t.integer "ni_type"
    t.integer "role"
    t.integer "progress_status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "spanish_test_score_file_name"
    t.string "spanish_test_score_content_type"
    t.integer "spanish_test_score_file_size"
    t.datetime "spanish_test_score_updated_at"
    t.string "person_identifier", default: ""
    t.boolean "archived", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "work_experiences", force: :cascade do |t|
    t.string "work_kind"
    t.string "firm_organisation"
    t.date "from"
    t.date "to"
    t.string "country"
    t.bigint "student_application_form_id"
    t.index ["student_application_form_id"], name: "index_work_experiences_on_student_application_form_id"
  end

end
