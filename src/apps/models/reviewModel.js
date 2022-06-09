const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
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
    avatar: {
        type: String,
        default: ''
    },
    phone_number: {
        type: String,
        required: [true, 'please enter a phone_number'],
        minlength: [6, "the phone_number should be at least 6 characters"],
        
    },
    star:{
        type: Number,
        min: 0,
        max: 5,
        default: 5
    },
    is_hide:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})
const review = mongoose.model('review', reviewSchema);
module.exports = review;