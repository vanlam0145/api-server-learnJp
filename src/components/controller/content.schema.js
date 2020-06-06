module.exports = class Schema {
  constructor() {}
  static createSchema = {
    type: 'object',
    properties: {
      text: { type: 'string' },
      mean: { type: 'string' },
    },
  };
  static triggerAnswerSchema = {
    type: 'object',
    properties: {
      type: { type: 'string', enum: ['listen', 'write', 'learn'] },
      answer: { type: 'boolean' },
    },
    required: ['type', 'answer'],
  };
};
