exports.tag = () => {
    return {
        "name": "Users",
        "description": "API for users in the system"
    }
}
exports.path = () => {
    return {
        "/users": {
            "get": {
                "tags": ["AdminDashboard"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "Lấy ra tất cả User với quyền admin",
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
                "tags": ["Users"],
                "summary": "create users",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Users"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Users"
                        }
                    },
                    "422": {
                        "$ref": "#/definitions/responses/UnprocessableEntity"
                    }
                }
            }
        },
        "/users/me": {
            "get": {
                "tags": ["Users"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "get details users",
                // "parameters": [
                //     {
                //         //them vao sau
                //         //   "name": "id",
                //         //   "in": "path",
                //         //   "description": "id of topic",
                //         //   "required": true,
                //         //   "type": "integer",
                //         //   "format": "int64"
                //     }
                // ],
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
        },
        "/users/{id}": {

            "delete": {
                "tags": ["AdminDashboard"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "delete users",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of users",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Users"
                        }
                    },
                    "422": {
                        "$ref": "#/definitions/responses/UnprocessableEntity"
                    },
                    "401": {
                        "$ref": "#/definitions/responses/UnauthorizedError"
                    }
                }
            },
            "put": {
                "tags": ["Users"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "update details users",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Users"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Users"
                        }
                    },
                    "422": {
                        "$ref": "#/definitions/responses/UnprocessableEntity"
                    },
                    "401": {
                        "$ref": "#/definitions/responses/UnauthorizedError"
                    }
                }
            },
        },
        "/users/login": {
            "post": {
                "tags": ["Users"],
                "summary": "login",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Login"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Login"
                        }
                    },
                    "422": {
                        "$ref": "#/definitions/responses/UnprocessableEntity"
                    }
                }
            }
        },
        "/users/get-courses-latest": {
            "get": {
                "tags": ["Users"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "get details users",
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
        },
        "/users/setAvartar/{idimage}": {
            "put": {
                "tags": ["Users"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "get details users",
                "parameters": [
                    {
                        "name": "idimage",
                        "in": "path",
                        "description": "id of image",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
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
        },
        "/users/image/{id}": {
            "delete": {
                "tags": ["Users"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "delete users",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of image",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Users"
                        }
                    },
                    "422": {
                        "$ref": "#/definitions/responses/UnprocessableEntity"
                    },
                    "401": {
                        "$ref": "#/definitions/responses/UnauthorizedError"
                    }
                }
            },
        },
        "/users/image": {
            post: {
                "tags": ["Users"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "upload File",
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: 'object',
                                properties: {
                                    file: {
                                        type: 'string',
                                        format: 'binary'
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Users"
                        }
                    },
                    "422": {
                        "$ref": "#/definitions/responses/UnprocessableEntity"
                    },
                    "401": {
                        "$ref": "#/definitions/responses/UnauthorizedError"
                    }
                }
            }
        }
    }
}
exports.definition = () => {
    return {
        "Users": {
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
        "Login": {
            "type": "object",
            "properties": {
                "username": {
                    "type": "string"
                },
                "password": {
                    "type": "string",
                }
            },
            required: ["username", "password"]
        }
    }
}