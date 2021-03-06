const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route   GET api/stickers
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Stickers route'));

// @route   POST api/stickers
// @desc    Create or Update a User Profile
// @access  Private
router.post('/', auth, 
    async (req, res) => {

    const {
       tags
    } = req.body;
    // Build Sticker Object
    const stickerFields = {};
    if(tags){
        stickerFields.tags = tags.split(',').map(tag => tag.trim()); 
    }
    console.log(stickerFieldstags);
    res.send('hi');
});
module.exports = router;