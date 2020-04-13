const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
    instagram: {
        type: String
    },
    website: {
        type: String
    },
    bio: {
        type: String
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);