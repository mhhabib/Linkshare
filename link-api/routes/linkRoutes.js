const express = require('express');
const {
	createLink,
	getUserLinks,
	updateLink,
	deleteLink,
	reorderLinks,
} = require('../controllers/linkController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/links/reorder', protect, reorderLinks);

router.post('/links', protect, createLink);
router.get('/links', protect, getUserLinks);
router.put('/links/:linkId', protect, updateLink);
router.delete('/links/:linkId', protect, deleteLink);

module.exports = router;
