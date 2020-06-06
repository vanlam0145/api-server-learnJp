const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeOnlineSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    minute: { type: Number, required: true, default: 0 },
    date: { type: String, required: true },
    month: { type: String, required: true },
    ngTao: { type: String },
    ngCapNhat: { type: String },
    status: { type: String, enum: ['active', 'deactive'], default: 'active' },
  },
  { timestamps: true }
);
timeOnlineSchema.index({ userId: 1, date: 1 }, { unique: true });
module.exports = { TimeOnlineModel: mongoose.model('TimeOnline', timeOnlineSchema) };
