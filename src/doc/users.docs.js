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
                "tags": ["Users"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "Lấy ra tất cả User",
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
        "/users/notFriend": {
            "get": {
                "tags": ["Users"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "Lấy toàn bộ người dùng không là bạn bè và chưa được gửi lời mời kết bạn của người đang đăng nhập",
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
        "/users/senderAddFriend": {
            "get": {
                "tags": ["Users"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "Lấy toàn bộ người dùng đã được mình gửi lời mời kết bạn",
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
        "/users/requestAddFriend": {
            "get": {
                "tags": ["Users"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "Lấy toàn bộ người đã gửi kết bạn cho mình",
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
            "get": {
                "tags": ["Users"],
                "summary": "get details users",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of users",
                        "required": true,
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
                        "required": true
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
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of users",
                        "required": true
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
            properties: {
                email: { type: 'string', format: 'email', example: "*@gmail.com" },
                username: { type: 'string' },
                password: { type: 'string' },
                phoneNumber: { type: 'string', minLength: 9, example: "0123456789" },
            },
            required: ['email', 'username', 'password']
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