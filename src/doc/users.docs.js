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
                "summary": "get all users",
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
        "/users/{id}": {
            "get": {
                "tags": ["Users"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "get details users",
                "parameters": [
                    {
                        //them vao sau
                        //   "name": "id",
                        //   "in": "path",
                        //   "description": "id of topic",
                        //   "required": true,
                        //   "type": "integer",
                        //   "format": "int64"
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
                        // "name": "id",
                        // "in": "path",
                        // "description": "id of users",
                        // "required": true,
                        // "type": "integer",
                        // "format": "int64"
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
    }
}