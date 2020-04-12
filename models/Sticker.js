const mongoose = require('mongoose');

const StickerSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    imgRef:{
        type: String
    },
    artistUrl: {
        type: String
    },
    artistName: {
        type: String
    },
    dateUploaded: {
        type: Date,
        default: Date.now
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
    }
});

module.exports = Sticker = mongoose.model('sticker', StickerSchema);