const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'please enter a first name'],
    },
    last_name: {
        type: String,
        required: [true, 'please enter a last name'],
    },
    email: {
        type: String,
        required: [true, 'please enter a email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please enter a valid email address']
    },
    phone_number: {
        type: String,
        required: [true, 'please enter a phone_number'],
        minlength: [6, "the phone_number should be at least 6 characters"],
        
    },
    api_key: {
        type: String,
        default: '',
    },
    limit: {
        type: Number,
        required: [true, 'please enter a lifetime'],
        min: 1,
        max: 30
    }
}, {
    timestamps: true,
})
const report = mongoose.model('report', reportSchema);
module.exports = report;