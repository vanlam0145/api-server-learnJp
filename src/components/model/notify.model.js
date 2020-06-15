const mongoose = require('mongoose')
const Schema = mongoose.Schema

const typeNotify = {
	requestAddFriend: 'requestAddFriend',
	acceptAddFriend: 'acceptAddFriend',

	createTopic: 'createTopic',
	updateTopic: 'updateTopic',
	deleteTopic: 'deleteTopic',

	createChallenge: 'createChallenge',
	updateChallenge: 'updateChallenge',
	deleteChallenge: 'deleteChallenge',
}

const notifySchema = new Schema({
	type: { type: String, enum: Object.keys(typeNotify) },
	idUser: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
	idOf: { type: String },
	title: { type: String },
	message: { type: String },
	seen: { type: Boolean, default: false },
	seenAt: { type: Date },
	ngTao: { type: String },
	ngCapNhat: { type: String },
	status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })
module.exports = { NotifyModel: mongoose.model('Notify', notifySchema), typeNotify }