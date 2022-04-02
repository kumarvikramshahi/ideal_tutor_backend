const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeachSession = new Schema({
    tid: {
        type: String,
        required: true,
        trim: true,
        minlength: [24, "Invalid user ID"],
        maxlength: [24, "Invalid user ID"]
    },
    booked_by_id: {
        type: String,
        required: true,
        trim: true,
        minlength: [24, "Invalid user ID"],
        maxlength: [24, "Invalid user ID"]
    },
    is_grp_study: { type: Boolean, required: true },
    s_ids: [{ type: String, trim: true, minlength: 24, maxlength: 24, required: false }],
    sess_type: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ["test", "teach", "discuss", "doubt"]
    },
    start_date: { type: Date, required: true, },
    end_data: { type: Date, required: true, },
    status: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ["scheduled", "pending", "completed","cancelled"]
    },
    sub_teach: [{ type: String, required: true }],
    is_teacher_visit: { type: Boolean, required: true, },
    total_charge: { type: Number, required: true },
    pay_modes: [{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ["cod", "net banking", "upi"]
    }], // it is array coz, in partial payment will be multiple pay id
    pay_ids: [{
        type: String,
        trim: true,
        minlength: [24, "Invalid payment ID"],
        maxlength: [24, "Invalid payment ID"]
    }]
});

module.exports = mongoose.model('Teach_Session', TeachSession);