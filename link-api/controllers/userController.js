const User = require('../models/User');
const Link = require('../models/Link');

exports.getUserProfileWithLinks = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		const links = await Link.find({ user: req.user.id }).sort({ order: 1 });
		const userProfile = {
			username: user.username,
			email: user.email,
			profilePicture: user.profilePicture,
			firstName: user.firstName,
			lastName: user.lastName,
			links: links, 
		};
		res.json(userProfile);
	} catch (error) {
		console.error('Error in getUserProfileWithLinks:', error);
		res.status(500).json({ error: 'Server error' });
	}
};


exports.getUserProfileByUsername = async (req, res) => {
	try {
		const username = req.params.username;
		const user = await User.findOne({ username }).select('-password');
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		const links = await Link.find({ user: user._id }).sort({ order: 1 });
		const userProfile = {
			username: user.username,
			email: user.email,
			profilePicture: user.profilePicture,
			firstName: user.firstName,
			lastName: user.lastName,
			links: links, 
		};
		res.json(userProfile);
	} catch (error) {
		console.error('Error in getUserProfileByUsername:', error);
		res.status(500).json({ error: 'Server error' });
	}
};