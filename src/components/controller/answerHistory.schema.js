const { typeLearnEnum } = require('../model/answerHistory.model');
module.exports = class Schema {
  constructor() {}
  static createSchema = {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['courser', 'topic'],
      },
      courserId: { type: 'string' },
      topicId: { type: 'string' },
      typeLearn: { type: 'string', enum: Object.keys(typeLearnEnum) },
      sumLearn: { type: 'string' },
    },
    required: ['type','typeLearn','sumLearn']
  };
};
