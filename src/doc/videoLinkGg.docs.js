exports.tag = () => {
  return {
    name: 'VideoLinkGg',
    description: 'API for videoLinkGg in the system',
  };
};
exports.path = () => {
  return {
    '/videoLinkGg': {
      get: {
        tags: ['VideoLinkGg'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get all videoLinkGg',
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
      // "post": {
      //     "tags": ["VideoLinkGg"],
      //     "summary": "create videoLinkGg",
      //     "security": [
      //         {
      //             "bearerAuth": []
      //         }
      //     ],
      //     "requestBody": {
      //         "required": true,
      //         "content": {
      //             "application/json": {
      //                 "schema": {
      //                     "$ref": "#/definitions/VideoLinkGg"
      //                 }
      //             }
      //         }
      //     },
      //     "responses": {
      //         "200": {
      //             "description": "OK",
      //             "schema": {
      //                 "$ref": "#/definitions/VideoLinkGg"
      //             }
      //         },
      //         "422": {
      //             "$ref": "#/definitions/responses/UnprocessableEntity"
      //         }
      //     }
      // }
    },
    '/videoLinkGg/{id}': {
      get: {
        tags: ['VideoLinkGg'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get details videoLinkGg',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of videoLinkGg',
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
      // "delete": {
      //     "tags": ["VideoLinkGg"],
      //     "security": [
      //         {
      //             "bearerAuth": []
      //         }
      //     ],
      //     "summary": "delete videoLinkGg",
      //     "parameters": [
      //         {
      //             "name": "id",
      //             "in": "path",
      //             "description": "id of videoLinkGg",
      //             "required": true,
      //         }
      //     ],
      //     "responses": {
      //         "200": {
      //             "description": "OK",
      //             "schema": {
      //                 "$ref": "#/definitions/VideoLinkGg"
      //             }
      //         },
      //         "422": {
      //             "$ref": "#/definitions/responses/UnprocessableEntity"
      //         },
      //         "401": {
      //             "$ref": "#/definitions/responses/UnauthorizedError"
      //         }
      //     }
      // },
      put: {
        tags: ['VideoLinkGg'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of videoLinkGg',
            required: true,
          },
        ],
        summary: 'update details videoLinkGg',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/VideoLinkGg',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/VideoLinkGg',
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
    '/videoLinkGg/refresh': {
      get: {
        tags: ['VideoLinkGg'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'refresh link thumanail',
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
    },
  };
};
exports.definition = () => {
  return {
    VideoLinkGg: {
      type: 'object',
      properties: {
        practice: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              question: { type: 'string' },
              answer: {
                type: 'array',
                items: { type: 'string' },
              },
              answer_id: { type: 'number' },
            },
          },
          required: ['question', 'answer', 'answer_id'],
        },
      },
      required: ['practice'],
    },
  };
};
