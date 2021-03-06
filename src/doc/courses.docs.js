exports.tag = () => {
  return {
    name: 'Course',
    description: 'API for course in the system',
  };
};
exports.path = () => {
  return {
    '/courses': {
      get: {
        tags: ['Course'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get all course',
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
        tags: ['Course'],
        summary: 'create course',
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
                $ref: '#/definitions/Course',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Course',
            },
          },
          '422': {
            $ref: '#/definitions/responses/UnprocessableEntity',
          },
        },
      },
    },
    '/courses/{id}': {
      get: {
        tags: ['Course'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get details course',
        parameters: [
          {
            //them vao sau
            name: 'id',
            in: 'path',
            description: 'id of topic',
            required: true,
            type: 'integer',
            format: 'int64',
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
        tags: ['Course'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'delete course',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of course',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Course',
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
      // "put": {
      //     "tags": ["Course"],
      //     "security": [
      //         {
      //             "bearerAuth": []
      //         }
      //     ],
      //     "summary": "update details course",
      //     "requestBody": {
      //         "required": true,
      //         "content": {
      //             "application/json": {
      //                 "schema": {
      //                     "$ref": "#/definitions/Course"
      //                 }
      //             }
      //         }
      //     },
      //     "responses": {
      //         "200": {
      //             "description": "OK",
      //             "schema": {
      //                 "$ref": "#/definitions/Course"
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
    },
    '/courses/{id}/learn': {
      get: {
        tags: ['Course'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'get details course',
        parameters: [
          {
            //them vao sau
            name: 'id',
            in: 'path',
            description: 'id of topic',
            required: true,
            type: 'integer',
            format: 'int64',
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
    '/courses/set-contents': {
      put: {
        tags: ['Course'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'update details course',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Course',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Course',
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
    '/courses/{id}/addContent': {
      put: {
        tags: ['Course'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id of courser',
            required: true,
          },
        ],
        summary: 'update details course',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    text: { type: 'string' },
                    mean: { type: 'string' },
                  },
                },
                required: ['text', 'mean'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Course',
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
    Course: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              text: { type: 'string' },
              mean: { type: 'string' },
            },
            required: ['text', 'mean'],
          },
        },
      },
      required: ['title', 'content'],
    },
  };
};
