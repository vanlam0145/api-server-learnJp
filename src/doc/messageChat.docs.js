exports.tag = () => {
  return {
    name: 'MessageChat',
    description: 'API for messageChat in the system',
  };
};
exports.path = () => {
  return {
    // '/messageChat': {
    //   get: {
    //     tags: ['MessageChat'],
    //     security: [
    //       {
    //         bearerAuth: [],
    //       },
    //     ],
    //     summary: 'get all messageChat',
    //     responses: {
    //       '200': {
    //         description: 'OK',
    //       },
    //       // "422": {
    //       //   "$ref": "#/definitions/responses/UnprocessableEntity"
    //       // },
    //       // "401": {
    //       //   "$ref": "#/definitions/responses/UnauthorizedError"
    //       // }
    //     },
    //   },
    //   post: {
    //     tags: ['MessageChat'],
    //     summary: 'create messageChat',
    //     security: [
    //       {
    //         bearerAuth: [],
    //       },
    //     ],
    //     requestBody: {
    //       required: true,
    //       content: {
    //         'application/json': {
    //           schema: {
    //             $ref: '#/definitions/MessageChat',
    //           },
    //         },
    //       },
    //     },
    //     responses: {
    //       '200': {
    //         description: 'OK',
    //         schema: {
    //           $ref: '#/definitions/MessageChat',
    //         },
    //       },
    //       '422': {
    //         $ref: '#/definitions/responses/UnprocessableEntity',
    //       },
    //     },
    //   },
    // },
    // '/messageChat/{id}': {
    //   get: {
    //     tags: ['MessageChat'],
    //     security: [
    //       {
    //         bearerAuth: [],
    //       },
    //     ],
    //     summary: 'get details messageChat',
    //     parameters: [
    //       {
    //         name: 'id',
    //         in: 'path',
    //         description: 'id of messageChat',
    //         required: true,
    //       },
    //     ],
    //     responses: {
    //       '200': {
    //         description: 'OK',
    //       },
    //       '422': {
    //         $ref: '#/definitions/responses/UnprocessableEntity',
    //       },
    //       '401': {
    //         $ref: '#/definitions/responses/UnauthorizedError',
    //       },
    //     },
    //   },
    //   delete: {
    //     tags: ['MessageChat'],
    //     security: [
    //       {
    //         bearerAuth: [],
    //       },
    //     ],
    //     summary: 'delete messageChat',
    //     parameters: [
    //       {
    //         name: 'id',
    //         in: 'path',
    //         description: 'id of messageChat',
    //         required: true,
    //       },
    //     ],
    //     responses: {
    //       '200': {
    //         description: 'OK',
    //         schema: {
    //           $ref: '#/definitions/MessageChat',
    //         },
    //       },
    //       '422': {
    //         $ref: '#/definitions/responses/UnprocessableEntity',
    //       },
    //       '401': {
    //         $ref: '#/definitions/responses/UnauthorizedError',
    //       },
    //     },
    //   },
    //   put: {
    //     tags: ['MessageChat'],
    //     security: [
    //       {
    //         bearerAuth: [],
    //       },
    //     ],
    //     parameters: [
    //       {
    //         name: 'id',
    //         in: 'path',
    //         description: 'id of messageChat',
    //         required: true,
    //       },
    //     ],
    //     summary: 'update details messageChat',
    //     requestBody: {
    //       required: true,
    //       content: {
    //         'application/json': {
    //           schema: {
    //             $ref: '#/definitions/MessageChat',
    //           },
    //         },
    //       },
    //     },
    //     responses: {
    //       '200': {
    //         description: 'OK',
    //         schema: {
    //           $ref: '#/definitions/MessageChat',
    //         },
    //       },
    //       '422': {
    //         $ref: '#/definitions/responses/UnprocessableEntity',
    //       },
    //       '401': {
    //         $ref: '#/definitions/responses/UnauthorizedError',
    //       },
    //     },
    //   },
    // },
    '/messageChat/ofFriend': {
      get: {
        tags: ['MessageChat'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Lấy toàn bộ tin nhắn giữa hai người',
        parameters: [{
          in: 'query',
          name: 'friend',
          schema: {
            type: 'string'
          },
          required: true
        }],
        responses:{
          '200':{
            
          }
        }
      },
    },
  };
};
exports.definition = () => {
  return {
    MessageChat: {
      type: 'object',
      properties: {
        field0example: {
          type: 'string',
        },
        field1example: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              field1examplefield0example: {
                type: 'string',
              },
              field1examplefield1example: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  };
};
