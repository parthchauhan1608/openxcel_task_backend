const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        topic_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "topic"
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        name: {
            type: String,
            required: true
        },
        discription: {
            type: String,
            required: true
        },
        comment: [
            {
                message: { type: String },
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user"
                },
                createdAt: {
                    type: Date,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

exports.Posts = mongoose.model('post', PostSchema);