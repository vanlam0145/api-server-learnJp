const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeLearnEnum = {
  learn: 'learn',
  write: 'write',
  spell: 'spell',
  question: 'question',
};
const answerHistorySchema = new Schema(
  {
    userId: { type: Schema.Types.Object, ref: 'Users', required: true },
    type: { type: String, enum: ['courser', 'topic'], required: true },
    courserId: { type: Schema.Types.ObjectId, ref: 'Course' },
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic' },
    typeLearn: { type: String, enum: Object.keys(typeLearnEnum), required: true },
    
    total: { type: Number, required: true },
    sumLearn: { type: Number, required: true },
    ngTao: { type: String },
    ngCapNhat: { type: String },
    status: { type: String, enum: ['active', 'deactive'], default: 'active' },
  },
  { timestamps: true }
);
module.exports = {
  AnswerHistoryModel: mongoose.model('AnswerHistory', answerHistorySchema),
  typeLearnEnum,
};
