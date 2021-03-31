const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        title: {
            type: String,
            required: true
        },
        discription: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

exports.Topics = mongoose.model('topic', TopicSchema);