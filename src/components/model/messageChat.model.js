const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionMessageEnum = {
  like: 'like',
  unlike: 'unlike',
  haha: 'haha',
  angry: 'angry',
  sad: 'sad',
  heart: 'heart',
};
const messageChatSchema = new Schema(
  {
    message: { type: String },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reaction: { type: String, enum: Object.keys(reactionMessageEnum) },
    seen: { type: Boolean, default: false },
    seenAt: { type: Date },

    ngTao: { type: String },
    ngCapNhat: { type: String },
    status: { type: String, enum: ['active', 'deactive'], default: 'active' },
  },
  { timestamps: true }
);
module.exports = {
  MessageChatModel: mongoose.model('MessageChat', messageChatSchema),
  reactionMessageEnum,
};
