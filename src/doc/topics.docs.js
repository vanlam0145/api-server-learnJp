exports.tag = () => {
  return {
    name: 'Topics',
    description: 'API for topics in the system',
  };
};
exports.path = () => {
  return {
    '/topics': {
      get: {
        tags: ['Topics'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get all topics',
        responses: {
          '200': {
            description: 'OK',
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
        tags: ['AdminDashboard'],
        summary: 'create topics',
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
                $ref: '#/definitions/Topics',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Topics',
            },
          },
          '422': {
            $ref: '#/definitions/responses/UnprocessableEntity',
          },
        },
      },
    },
    '/topics/{id}/learn': {
      get: {
        tags: ['Topics'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get data to learn',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of topics',
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
    },
    '/topics/{id}': {
      get: {
        tags: ['Topics'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get details topics',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of topics',
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
        tags: ['AdminDashboard'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'delete topics',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of topics',
            required: true,
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Topics',
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
        tags: ['AdminDashboard'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of topics',
            required: true,
          },
        ],
        summary: 'update details topics',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Topics',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Topics',
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
    '/topics/createAdmin': {
      post: {
        tags: ['AdminDashboard'],
        summary: 'create topics with vocabulary',
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
                $ref: '#/definitions/topicAndVoca',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Topics',
            },
          },
          '422': {
            $ref: '#/definitions/responses/UnprocessableEntity',
          },
        },
      },
    },
  };
};
exports.definition = () => {
  return {
    Topics: {
      type: 'object',
      properties: {
        title: { type: 'string' },
      },
      required: ['title'],
    },
    topicAndVoca: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        voca: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              text: { type: 'string' },
              kanji_text: { type: 'string' },
              kanji_meaning: { type: 'string' },
              vocabulary_meaning: { type: 'string' },
            },
            required: [
              'text',
              'kanji_text',
              'kanji_meaning',
              'vocabulary_meaning',
            ],
          },
        },
      },
      required: ['title', 'voca'],
    },
  };
};
