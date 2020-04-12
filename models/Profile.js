const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    fbUrl: {
        type: String
    },
    twitterUrl: {
        type: String
    },
    igUrl: {
        type: String
    },
    websiteUrl: {
        type: String
    },
    bio: {
        type: String
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);