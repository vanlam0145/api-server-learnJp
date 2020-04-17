exports.tag = () => {
    return {
        "name": "ReportUser",
        "description": "API for reportUser in the system"
    }
}
exports.path = () => {
    return {
        "/reportUser": {
            "get": {
                "tags": ["ReportUser"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "get all reportUser",
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
                "tags": ["ReportUser"],
                "summary": "create reportUser",
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
                                "$ref": "#/definitions/ReportUser"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/ReportUser"
                        }
                    },
                    "422": {
                        "$ref": "#/definitions/responses/UnprocessableEntity"
                    }
                }
            }
        },
        "/reportUser/{id}": {
            "get": {
                "tags": ["ReportUser"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "get details reportUser",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of reportUser",
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
                "tags": ["ReportUser"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "delete reportUser",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of reportUser",
                        "required": true,
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/ReportUser"
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
                "tags": ["ReportUser"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of reportUser",
                        "required": true,
                    }
                ],
                "summary": "update details reportUser",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/ReportUser"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/ReportUser"
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
        "ReportUser": {
            "type": "object",
            properties: {
                commentId: { type: 'string' },
                content: { type: 'string' }
            },
            required: ['commentId', 'content']
        },
    }
}