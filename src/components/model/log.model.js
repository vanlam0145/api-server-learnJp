const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema(
	{
		method: { type: String },
		url: { type: String },
		status: { type: String },
		res: { type: String },
		responseTime: { type: Number },
	},
	{ timestamps: true }
);
module.exports = { LogModel: mongoose.model('Log', logSchema) };
