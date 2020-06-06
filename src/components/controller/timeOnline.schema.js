module.exports = class Schema {
  constructor() {}
  static createSchema = {
    type: 'object',
    properties: {
      minute: { type: 'number' },
      date: { type: 'string', format: 'date-time' },
    },
    required: ['minute', 'date'],
  };
};
