const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new Schema({
	idChallenge: { type: Schema.Types.ObjectId, ref: 'challeng' },
	content: { type: String },
	idUser: { type: Schema.Types.ObjectId, ref: 'user' },
	ngTao: { type: String },
	ngCapNhat: { type: String },
	status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })
commentsSchema.index({ idChallenge: 1 }, { require: true })
module.exports = mongoose.model('Comments', commentsSchema)