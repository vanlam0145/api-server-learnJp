exports.tag = () => {
  return {
    name: 'TimeOnline',
    description: 'API for timeOnline in the system',
  };
};
exports.path = () => {
  return {
    '/timeOnline': {
      get: {
        tags: ['TimeOnline'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'query',
            name: 'filter',
            schema: {
              $ref: '#/definitions/TimeOnlineResponse',
            },
          },
        ],
        summary: 'get all timeOnline',
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
        tags: ['TimeOnline'],
        summary: 'create timeOnline',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/TimeOnline',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/TimeOnline',
            },
          },
          '422': {
            $ref: '#/definitions/responses/UnprocessableEntity',
          },
        },
      },
    },
    '/timeOnline/{id}': {
      get: {
        tags: ['TimeOnline'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get details timeOnline',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of timeOnline',
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
        tags: ['TimeOnline'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'delete timeOnline',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of timeOnline',
            required: true,
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/TimeOnline',
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
        tags: ['TimeOnline'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of timeOnline',
            required: true,
          },
        ],
        summary: 'update details timeOnline',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/TimeOnline',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/TimeOnline',
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
    TimeOnline: {
      type: 'object',
      properties: {
        minute: { type: 'number' },
        date: { type: 'string',format:'date-time' },
      },
      required:['minute','date']
    },
    TimeOnlineResponse: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          minute: { type: 'number' },
          date: { type: 'string' },
          month: { type: 'string' },
        },
      },
  };
};
