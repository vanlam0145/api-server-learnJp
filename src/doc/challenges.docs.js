exports.tag = () => {
    return {
        "name": "Challenges",
        "description": "API for challenges in the system"
    }
}
exports.path = () => {
    return {
        "/challenges": {
            "get": {
                "tags": ["Challenges"],
                "summary": "get all challenges",
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    // "422": {
                    //   "$ref": "#/definitions/responses/UnprocessableEntity"
                    // },
                    // "401": {
                    //   "$ref": "#/definitions/responses/UnauthorizedError"
                    // }
                }
            },
            "post": {
                "tags": ["AdminDashboard"],
                "summary": "create challenges",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Challenges"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Challenges"
                        }
                    },
                    "422": {
                        "$ref": "#/definitions/responses/UnprocessableEntity"
                    }
                }
            }
        },
        "/challenges/{id}": {
            "get": {
                "tags": ["Challenges"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "get details challenges",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of challenges",
                        "required": true,
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "422": {
                        "$ref": "#/definitions/responses/UnprocessableEntity"
                    },
                    "401": {
                        "$ref": "#/definitions/responses/UnauthorizedError"
                    }
                }
            },
            // "delete": {
            //     "tags": ["Challenges"],
            //     "security": [
            //         {
            //             "bearerAuth": []
            //         }
            //     ],
            //     "summary": "delete challenges",
            //     "parameters": [
            //         {
            //             // "name": "id",
            //             // "in": "path",
            //             // "description": "id of challenges",
            //             // "required": true,
            //             // "type": "integer",
            //             // "format": "int64"
            //         }
            //     ],
            //     "responses": {
            //         "200": {
            //             "description": "OK",
            //             "schema": {
            //                 "$ref": "#/definitions/Challenges"
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
            // "put": {
            //     "tags": ["Challenges"],
            //     "security": [
            //         {
            //             "bearerAuth": []
            //         }
            //     ],
            //     "summary": "update details challenges",
            //     "requestBody": {
            //         "required": true,
            //         "content": {
            //             "application/json": {
            //                 "schema": {
            //                     "$ref": "#/definitions/Challenges"
            //                 }
            //             }
            //         }
            //     },
            //     "responses": {
            //         "200": {
            //             "description": "OK",
            //             "schema": {
            //                 "$ref": "#/definitions/Challenges"
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
        "/challenges/{id}/file": {
            put: {
                "tags": ["AdminDashboard"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "upload File image or sound",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of Challenge",
                        "required": true,
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: 'object',
                                properties: {
                                    file: {
                                        type: 'string',
                                        format: 'binary'
                                    },
                                    type: { type: 'string', enum: ['image', 'choice_1_voice', 'choice_2_voice'] }
                                },
                                required: ['file', 'type']
                            }
                        }
                    }
                }
            }
        }
    }
}
exports.definition = () => {
    return {
        "Challenges": {
            "type": "object",
            "properties": {
                "field0example": {
                    "type": "string"
                },
                "field1example": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "field1examplefield0example": {
                                "type": "string"
                            },
                            "field1examplefield1example": {
                                "type": "string"
                            }
                        }
                    }
                }
            }
        },
    }
}