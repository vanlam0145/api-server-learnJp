const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    avatar: {
      type: mongoose.Schema.ObjectId,
      ref: 'Avatar',
    },
    mean: {
      type: String,
      required: true,
    },
    pronounce: {
      type: String,
    },
    language: {
      type: String,
    },
    totalClickLearn: { type: Number, default: 0 },
    totalTrueLearn: { type: Number, default: 0 },
    totalClickListen: { type: Number, default: 0 },
    totalTrueListen: { type: Number, default: 0 },
    totalClickWrite: { type: Number, default: 0 },
    totalTrueWrite: { type: Number, default: 0 },
    masterContent: { type: Boolean, default: false },

    ngTao: { type: String },
    ngCapNhat: { type: String },
    status: { type: String, enum: ['active', 'deactive'], default: 'active' },
  },
  { timestamps: true }
);
module.exports = { ContentModel: mongoose.model('Content', contentSchema) };
