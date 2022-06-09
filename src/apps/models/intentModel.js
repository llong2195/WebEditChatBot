const mongoose = require('mongoose');

const intentSchema = mongoose.Schema({
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
        required: [true, 'please enter a slug'],
    },
    user_id :{
        type: mongoose.Types.ObjectId,
        ref: 'user',
    }
}, {
    timestamps: true,
})
const intent = mongoose.model('intent', intentSchema);
module.exports = intent;