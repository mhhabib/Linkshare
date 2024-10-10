const Link = require('../models/Link');

exports.createLink = async (req, res) => {
	const { icon, shortName, originalUrl } = req.body;
	try {
		const link = new Link({ user: req.user.id, icon, shortName, originalUrl });
		await link.save();
		res.status(201).json({ link });
	} catch (error) {
		if (error.name === 'ValidationError') {
			const validationErrors = Object.values(error.errors).map(
				(err) => err.message
			);
			res.status(400).json({ error: validationErrors.join(', ') });
		} else {
			res
				.status(400)
				.json({ error: 'An error occurred while saving the link' });
		}
	}
};

exports.getUserLinks = async (req, res) => {
	try {
		const userId = req.user.id;
		const links = await Link.find({ user: userId }).sort('order');
		res.json(links);
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error fetching links', error: error.message });
	}
};

exports.updateLink = async (req, res) => {
	const { linkId } = req.params;
	const { icon, shortName, originalUrl } = req.body;

	try {
		const link = await Link.findOne({ _id: linkId, user: req.user.id });
		if (!link) {
			return res.status(404).json({ error: 'Link not found' });
		}

		if (icon !== undefined) link.icon = icon;
		if (shortName !== undefined) link.shortName = shortName;
		if (originalUrl !== undefined) link.originalUrl = originalUrl;

		await link.save();
		res.status(200).json({ message: 'Link updated successfully', link });
	} catch (error) {
		res.status(400).json({ error: 'Error updating link: ' + error.message });
	}
};

exports.deleteLink = async (req, res) => {
	const { linkId } = req.params;
	console.log('Delete: ', linkId, req.user.id);
	try {
		const link = await Link.findOneAndDelete({
			_id: linkId,
			user: req.user.id,
		});
		if (!link) {
			return res
				.status(404)
				.json({ error: 'Link not found or not authorized' });
		}
		res.status(200).json({ message: 'Link deleted successfully' });
	} catch (error) {
		res.status(400).json({ error: 'Error deleting link: ' + error.message });
	}
};

exports.reorderLinks = async (req, res) => {
	const { links } = req.body;
	if (!Array.isArray(links)) {
		return res
			.status(400)
			.json({ error: 'Invalid input. Expected an array of link IDs.' });
	}

	try {
		// Update the order of each link
		for (let i = 0; i < links.length; i++) {
			await Link.findByIdAndUpdate(links[i], { order: i });
		}

		// Fetch the updated links
		const updatedLinks = await Link.find({ _id: { $in: links } }).sort('order');
		res
			.status(200)
			.json({ message: 'Links reordered successfully', links: updatedLinks });
	} catch (error) {
		res.status(400).json({ error: 'Error reordering links: ' + error.message });
	}
};
