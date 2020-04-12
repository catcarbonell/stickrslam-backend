const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    stickers_owned: {
        type: [String]
    },
    stickers_wishlist: {
        type: [String]
    },
});

module.exports = User = mongoose.model('user', UserSchema);