const { typeLearnEnum } = require('../components/model/answerHistory.model');
exports.tag = () => {
  return {
    name: 'AnswerHistory',
    description: 'API for answerHistory in the system',
  };
};
exports.path = () => {
  return {
    '/answerHistory': {
      get: {
        tags: ['AnswerHistory'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get all answerHistory',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/definitions/AnswerHistoryResonse',
                },
              },
            },
          },
          // "422": {
          //   "$ref": "#/definitions/responses/UnprocessableEntity"
          // },
          // "401": {
          //   "$ref": "#/definitions/responses/UnauthorizedError"
          // }
        },
      },
      post: {
        tags: ['AnswerHistory'],
        summary: 'create answerHistory',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/AnswerHistory',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/definitions/AnswerHistoryResonse',
                },
              },
            },
          },
          '422': {
            $ref: '#/definitions/responses/UnprocessableEntity',
          },
        },
      },
    },
    '/answerHistory/{id}': {
      get: {
        tags: ['AnswerHistory'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get details answerHistory',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of answerHistory',
            required: true,
          },
        ],
        responses: {
          '200': {
            description: 'OK',
          },
          '422': {
            $ref: '#/definitions/responses/UnprocessableEntity',
          },
          '401': {
            $ref: '#/definitions/responses/UnauthorizedError',
          },
        },
      },
      delete: {
        tags: ['AnswerHistory'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'delete answerHistory',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of answerHistory',
            required: true,
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/AnswerHistory',
            },
          },
          '422': {
            $ref: '#/definitions/responses/UnprocessableEntity',
          },
          '401': {
            $ref: '#/definitions/responses/UnauthorizedError',
          },
        },
      },
      put: {
        tags: ['AnswerHistory'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of answerHistory',
            required: true,
          },
        ],
        summary: 'update details answerHistory',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/AnswerHistory',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/AnswerHistory',
            },
          },
          '422': {
            $ref: '#/definitions/responses/UnprocessableEntity',
          },
          '401': {
            $ref: '#/definitions/responses/UnauthorizedError',
          },
        },
      },
    },
  };
};
exports.definition = () => {
  return {
    AnswerHistory: {
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
      required: ['type', 'typeLearn', 'sumLearn'],
    },
    AnswerHistoryResonse: {
      type: 'object',
      properties: {
        userId: { type: 'string' },

        type: {
          type: 'string',
          enum: ['courser', 'topic'],
        },
        courserId: { type: 'string' },
        topicId: { type: 'string' },
        typeLearn: { type: 'string', enum: Object.keys(typeLearnEnum) },
        total: { type: 'number' },
        sumLearn: { type: 'number' },
      },
    },
  };
};
