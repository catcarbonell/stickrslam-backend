const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile')
const User = require('../../models/User');

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
});

// @route   POST api/profile
// @desc    Create or Update a User Profile
// @access  Private
router.post('/', auth, 
    async (req, res) =>{

    const {
        username,
        bio,
        website,
        twitter,
        facebook,
        instagram,
    } = req.body;

    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.username = username;
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
            console.log('Profile Updated!')
            return res.json(profile);
        } else if(!profile){
        
            // Create
            profile =  new Profile(profileFields);
            await profile.save();
            res.json(profile)
            console.log('Profile Created!')
        }
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile
// @desc    Get ALL Profiles
// @access  Public
router.get('/', async (req, res) =>{
    try {
        const profiles = await Profile.find().populate('user', 'username');
        res.json(profiles);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/user/:user_id
// @desc    Get Profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) =>{
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', 'username');
        if(!profile){
            return res.status(400).json({ msg: 'Profile not found'});
        }
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile
// @desc    DELETE  profile, user, stickers, and post
// @access  Private
router.delete('/', auth, async (req, res) =>{
    try {
        // Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove User
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted'});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;