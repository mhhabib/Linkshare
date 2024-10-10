const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		icon: String,
		shortName: {
			type: String,
			required: true,
		},
		originalUrl: {
			type: String,
			required: true,
		},
		order: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Link', linkSchema);
