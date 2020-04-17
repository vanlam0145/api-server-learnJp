exports.tag = () => {
    return {
        "name": "Vocabularies",
        "description": "API for vocabularies in the system"
    }
}
exports.path = () => {
    return {
        "/vocabularies": {
            "get": {
                "tags": ["Vocabularies"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "get all vocabularies",
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
                "summary": "create vocabularies",
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
                                "$ref": "#/definitions/Vocabularies"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Vocabularies"
                        }
                    },
                    "422": {
                        "$ref": "#/definitions/responses/UnprocessableEntity"
                    }
                }
            }
        },
        "/vocabularies/{id}": {
            "get": {
                "tags": ["Vocabularies"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "get details vocabularies",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of vocabularies",
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
                "summary": "delete vocabularies",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of vocabularies",
                        "required": true,
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Vocabularies"
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
                "tags": ["AdminDashboard"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of vocabularies",
                        "required": true,
                    }
                ],
                "summary": "update details vocabularies",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/definitions/Vocabularies"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/Vocabularies"
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
        "/vocabularies/topic/{id}": {
            "get": {
                "tags": ["Vocabularies"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "Lấy toàn bộ vocabularie của 1 topic",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "id of vocabularies",
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
        "Vocabularies": {
            "type": "object",
            properties: {
                text: { type: 'string' },
                kanji_text: { type: 'string' },
                kanji_text: { type: 'string' },
                vocabulary_meaning: { type: 'string' },
                topicId: { type: 'string' }
            },
            required: ['text', 'topicId']
        },
    }
}