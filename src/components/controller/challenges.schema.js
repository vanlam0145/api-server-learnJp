module.exports = class Schema {
  constructor() {}
  static createSchema = {
    type: 'object',
    properties: {
      choice_1: { type: 'string' },
      choice_2: { type: 'string' },
      answer: { type: 'number' },
      question: { type: 'string' },
      explanation: { type: 'string' },
      level: { type: 'number' },
    },
    required: [
      'choice_1',
      'choice_2',
      'answer',
      'question',
      'explanation',
      'level',
    ],
  };
  static updateFile = {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['image', 'choice_1_voice', 'choice_2_voice'],
      },
    },
    required: ['type'],
  };
  static updateSchema = {
    type: 'object',
    properties: {
      level: { type: 'number' },
      choice_1: { type: 'string' },
      choice_2: { type: 'string' },
      answer: { type: 'string' },
      question: { type: 'string' },
      explanation: { type: 'string' },
    },
  };
};
