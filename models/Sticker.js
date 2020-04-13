const mongoose = require('mongoose');

const StickerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    image:{
        type: String
    },
    artistUrl: {
        type: String
    },
    artistName: {
        type: String
    },
    comments: {
        type: [String]
    },
    tags: {
        type: [String]
    },
    public: {
        type: Boolean,
        default: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
});

module.exports = Sticker = mongoose.model('sticker', StickerSchema);