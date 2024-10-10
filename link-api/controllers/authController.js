const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = new User({ username, password });
		await user.save();
		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (!user || !(await user.matchPassword(password))) {
			return res.status(401).json({ message: 'Invalid username or password' });
		}
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});
		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateProfile = async (req, res) => {
	const { firstName, lastName, email } = req.body;
	const profilePicture = req.file ? req.file.path : null;
	try {
		const user = await User.findByIdAndUpdate(
			req.user.id,
			{ firstName, lastName, email, profilePicture },
			{ new: true }
		);
		res.status(200).json({ user });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
};
