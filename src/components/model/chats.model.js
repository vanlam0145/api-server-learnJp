const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatsSchema = new Schema({

	ngTao: {type: String},
	ngCapNhat: {type: String},
	status: {type: String, enum: ["active", "deactive"], default: "active"}
}, {timestamps: true})
module.exports = mongoose.model('Chats', chatsSchema)