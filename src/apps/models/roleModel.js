const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter a name'],
    },
    slug: {
        type: String,
        required: [true, 'please enter a first name'],
    },
}, {
    timestamps: true,
})
const role = mongoose.model('role', roleSchema);
module.exports = role;