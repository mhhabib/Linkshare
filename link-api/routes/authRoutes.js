const express = require('express');
const {
	register,
	login,
	updateProfile,
	getProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', protect, upload.single('profilePicture'), updateProfile);
router.get('/profile', protect, getProfile);

module.exports = router;
