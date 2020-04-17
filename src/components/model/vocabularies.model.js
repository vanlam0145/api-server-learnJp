const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vocabulariesSchema = new Schema({
	text: { type: String, required: true },
	sound: { type: String },
	kanji_text: { type: String },
	kanji_meaning: { type: String },
	vocabulary_meaning: { type: String },
	highlighted: { type: String },
	avatar: { type: String },
	topicId: { type: Schema.Types.ObjectId, ref: 'topic', required: true },
	ngTao: { type: String },
	ngCapNhat: { type: String },
	status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })
module.exports = mongoose.model('Vocabularies', vocabulariesSchema)