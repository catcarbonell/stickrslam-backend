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
    },
    stickers_owned: {
        type: mongoose.Schema.Types.stickers_owned,
        ref: 'user'
    },
    stickers_wishlist: {
        type: mongoose.Schema.Types.stickers_wishlist,
        ref: 'user'
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);