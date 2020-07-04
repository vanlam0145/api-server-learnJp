module.exports = class Schema {
  constructor() {}
  static createSchema = {
    type: 'object',
    properties: {
      //name: {type: 'string'},
    },
    //required: ['name']
  };
  static updateSchema = {
    type: 'object',
    properties: {
      practice: {
        type: 'array',
        items: [
          {
            question: { type: 'string' },
            answer: {
              type: 'array',
              items: [{ type: 'string' }],
            },
            answer_id: { type: 'number' },
          },
        ],
        required: ['question', 'answer', 'answer_id'],
      },
    },
    required: ['practice'],
  };
};
