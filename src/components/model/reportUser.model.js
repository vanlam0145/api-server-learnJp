const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reportUserSchema = new Schema({
	accusersId: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
	accusedId: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
	commentId: { type: mongoose.Types.ObjectId, required: true, ref: 'comment' },
	content: { type: String },
	ngTao: { type: String },
	ngCapNhat: { type: String },
	confirm: { type: String, enum: ["notSeen", "seen", "helpful", "harmful"], default: 'notSeen' },
	status: { type: String, enum: ["process", "processed"], default: "process" }
}, { timestamps: true })
module.exports = mongoose.model('ReportUser', reportUserSchema)