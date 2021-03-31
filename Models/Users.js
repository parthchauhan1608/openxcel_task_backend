const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

exports.Users = mongoose.model('user', UserSchema);