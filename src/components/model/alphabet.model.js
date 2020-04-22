const mongoose = require('mongoose')
const Schema = mongoose.Schema

const alphabetSchema = new Schema({
	number: { type: Number },
	romaji: { type: String },
	hira: { type: String },
	kata: { type: String },
	example: { type: String },
	ngTao: { type: String },
	ngCapNhat: { type: String },
	status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })
module.exports = mongoose.model('Alphabet', alphabetSchema)