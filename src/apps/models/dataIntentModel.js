const mongoose = require('mongoose');

const dataIntentSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, 'please enter a content'],
    },
    intent_id: {
        type: mongoose.Types.ObjectId,
        ref : "intent"
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref : "user"
    },
}, {
    timestamps: true,
})
const dataIntent = mongoose.model('dataIntent', dataIntentSchema);
module.exports = dataIntent;