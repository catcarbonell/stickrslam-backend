const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile')
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth,  async (req, res) => {
    try{

        const profile = await Profile.findOne({ user: req.user.id }).populate('user',['username']);

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }
        res.json(profile);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
} );

// @route   POST api/profile
// @desc    Create or Update a User Profile
// @access  Private
router.post('/', auth, 
    async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array });
    }

    const {
        bio,
        website,
        twitter,
        facebook,
        instagram,
    } = req.body;
    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(bio) profileFields.bio = bio;
    if(website) profileFields.website = website;
    if(twitter) profileFields.twitter = twitter;
    if(facebook) profileFields.facebook = facebook;
    if(instagram) profileFields.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if(profile){
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }
        // Create
            profile = new Profile(profileFields);
            await Profile.save();
            res.json(profile)
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;