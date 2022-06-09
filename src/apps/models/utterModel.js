const mongoose = require('mongoose');

const utterSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter a name'],
    },
    slug: {
        type: String,
        required: [true, 'please enter a slug'],
    },
    description: {
        type: String,
        required: [true, 'please enter a description'],
    },
    user_id :{
        type: mongoose.Types.ObjectId,
        ref: 'user',
    }
}, {
    timestamps: true,
})
const utter = mongoose.model('utter', utterSchema);
module.exports = utter;