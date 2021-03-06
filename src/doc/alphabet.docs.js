exports.tag = () => {
  return {
    name: 'Alphabet',
    description: 'API for alphabet in the system',
  };
};
exports.path = () => {
  return {
    '/alphabet': {
      get: {
        tags: ['Alphabet'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get all alphabet',
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
      post: {
        tags: ['Alphabet'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Create a alphabet by ADMIN',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#definitions/Alphabet',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/alphabet/{id}': {
      get: {
        tags: ['Alphabet'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get details alphabet',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of alphabet',
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
            description: 'id of alphabet',
            required: true,
          },
        ],
        summary: 'update details alphabet',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  description: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {},
                    },
                  },
                },
                required: ['description'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Alphabet',
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
      delete: {
        tags: ['Alphabet'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of alphabet',
            required: true,
          },
        ],
        summary: 'delete a alphabet by ADMIN',
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Alphabet',
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
    Alphabet: {
      type: 'object',
      properties: {
        romaji: { type: 'string' },
        hira: { type: 'string' },
        kata: { type: 'string' },
        example: { type: 'string' },
      },
    },
  };
};
