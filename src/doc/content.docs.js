exports.tag = () => {
  return {
    name: 'Content',
    description: 'API for content in the system',
  };
};
exports.path = () => {
  return {
    // "/content": {
    //     // "get": {
    //     //     "tags": ["Content"],
    //     //     "security": [
    //     //         {
    //     //             "bearerAuth": []
    //     //         }
    //     //     ],
    //     //     "summary": "get all content",
    //     //     "responses": {
    //     //         "200": {
    //     //             "description": "OK"
    //     //         },
    //     //         // "422": {
    //     //         //   "$ref": "#/definitions/responses/UnprocessableEntity"
    //     //         // },
    //     //         // "401": {
    //     //         //   "$ref": "#/definitions/responses/UnauthorizedError"
    //     //         // }
    //     //     }
    //     // },
    //     // "post": {
    //     //     "tags": ["Content"],
    //     //     "summary": "create content",
    //     //     "security": [
    //     //         {
    //     //             "bearerAuth": []
    //     //         }
    //     //     ],
    //     //     "requestBody": {
    //     //         "required": true,
    //     //         "content": {
    //     //             "application/json": {
    //     //                 "schema": {
    //     //                     "$ref": "#/definitions/Content"
    //     //                 }
    //     //             }
    //     //         }
    //     //     },
    //     //     "responses": {
    //     //         "200": {
    //     //             "description": "OK",
    //     //             "schema": {
    //     //                 "$ref": "#/definitions/Content"
    //     //             }
    //     //         },
    //     //         "422": {
    //     //             "$ref": "#/definitions/responses/UnprocessableEntity"
    //     //         }
    //     //     }
    //     // }
    // },
    '/content/{id}': {
      get: {
        tags: ['Content'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get details content',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of content',
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
        tags: ['Content'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'delete content',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of content',
            required: true,
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Content',
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
        tags: ['Content'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of content',
            required: true,
          },
        ],
        summary: 'update details content',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Content',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Content',
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
    '/content/{id}/triggerAnswer': {
      put: {
        tags: ['Content'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of content',
            required: true,
          },
        ],
        summary: 'update details content',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/TriggerAnswer',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Content',
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
    Content: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        mean: { type: 'string' },
      },
    },
    TriggerAnswer: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['listen', 'write', 'learn'] },
        answer: { type: 'boolean' },
      },
      required: ['type', 'answer'],
    },
  };
};
