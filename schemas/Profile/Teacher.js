const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeacherProfile = new Schema({
    first_Name: { type: String, required: true, maxlength: 15, trim: true }, // *
    last_Name: { type: String, required: true, maxlength: 15, trim: true },  // *
    email: { type: String, required: true, unique: true, trim: true },
    mobileNo: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    profile_Pic: { type: String },  // *
    skills: {
        max_level_class_teach: { type: String },
        subject_teach: [{ type: String }]
    },
    experience: { type: Number },  // experience in year
    achievement: { type: String },
    teach_sessions: [{
        type: String,
        trim: true,
        minlength: [24, "Invalid user ID"],
        maxlength: [24, "Invalid user ID"]
    }],
    number_of_student_teach: { type: Number },
    rating_star: { type: Number }, // *
    number_of_rating_given: { type: Number }, // *
    book_prefrence_list: [{ type: Number }], // BookId array
    address: {
        cur_addr: { type: String, maxlength: 100 },
        pincode: { type: Number, required: false },
        city: { type: Number },
        state: { type: Number },
    },
    joining_date: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Teacher', TeacherProfile);