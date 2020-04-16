exports.tag = () => {
    return {
        "name": "Comments",
        "description": "API for comments in the system"
    }
}
exports.path = () => {
    return {
        "/comments": {
            "get": {
                "tags": ["Comments"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "get all comments",
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
            }
        },
        "/comments/{id}": {
            "get": {
                "tags": ["Comments"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "get details comments",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of comments",
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
            "delete": {
                "tags": ["AdminDashboard"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "delete comments",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of comments",
                        "required": true,
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Comments"
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
        },
        "/comments/challenge/{id}":{
            "get": {
                "tags": ["Comments"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "Lấy toàn bộ commet của một challenge",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of challenge",
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
        }
    }
}
exports.definition = () => {
    return {
        "Comments": {
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