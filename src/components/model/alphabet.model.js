const mongoose = require('mongoose')
const Schema = mongoose.Schema

const alphabetSchema = new Schema({
	name: { type: String, required: true, unique: true },
	singleVowel: { type: Array },
	doubleVowel: { type: Array },
	description: { type: Array, default: [] },
	ngTao: { type: String },
	ngCapNhat: { type: String },
	status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })
module.exports = mongoose.model('Alphabet', alphabetSchema)