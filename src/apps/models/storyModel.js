const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter a name'],
    },
    data: [{
        intent_id:{
            type: mongoose.Types.ObjectId,
            ref:"intent"
        },
        utter_id:{
            type: mongoose.Types.ObjectId,
            ref:"utter"
        },
    }],
}, {
    timestamps: true,
})
const story = mongoose.model('story', storySchema);
module.exports = story;