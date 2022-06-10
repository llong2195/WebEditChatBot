const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please enter a email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, "the password should be at least 6 characters"]
    },
    first_name: {
        type: String,
        required: [true, 'please enter a first name'],
    },
    last_name: {
        type: String,
        required: [true, 'please enter a last name'],
    },
    avatar: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: 'male'
    },
    address: {
        type: String,
        default: ''
    },
    phone_number: {
        type: Number,
        required: [true, 'please enter a phone_number'],
        minlength: [6, "the phone_number should be at least 6 characters"]
    },
    role_id: {
        type: mongoose.Types.ObjectId,
        ref: "role",
        required: true
    },
    api_key: {
        type: String,
        default: '',
    },
    is_deleted: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true,
})
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({
        email: email, 
        is_deleted: false
    });
    if (user) {
        const isAuthenticated = await bcrypt.compare(password, user.password);
        if (isAuthenticated) {
            delete user.password;
            return user;
        }
        throw Error('incorrect password');
    } else {
        throw Error('incorrect email');
    }
}
const user = mongoose.model('user', userSchema);
module.exports = user;