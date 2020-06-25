module.exports = class Schema {
  constructor() {}
  static createSchema = {
    type: 'object',
    properties: {
      romaji: { type: 'string' },
      hira: { type: 'string' },
      kata: { type: 'string' },
      example: { type: 'string' },
    },
  };
  static updateSchema = {
    type: 'object',
    properties: {},
  };
};
