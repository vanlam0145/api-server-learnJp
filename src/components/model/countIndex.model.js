const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeEnum = {
  challenge: 'challenge',
  topic: 'topic',
};
const countIndexSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.keys(typeEnum),
      required: true,
      unique: true,
    },
    number: { type: Number, default: 0 },
    ngTao: { type: String },
    ngCapNhat: { type: String },
    status: { type: String, enum: ['active', 'deactive'], default: 'active' },
  },
  { timestamps: true }
);
module.exports = {
  CountIndexModel: mongoose.model('CountIndex', countIndexSchema),
  typeEnum,
};
