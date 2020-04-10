const express = require('express');
const router = express.Router();

// @route   GET api/stickers
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Stickers route'));

module.exports = router;