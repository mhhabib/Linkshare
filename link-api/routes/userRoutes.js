const express = require('express');
const {
	getUserProfileWithLinks,
	getUserProfileByUsername,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', protect, getUserProfileWithLinks);
router.get('/:username', getUserProfileByUsername);

module.exports = router;
