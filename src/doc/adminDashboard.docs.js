exports.tag = () => {
    return {
        "name": "AdminDashboard",
        "description": "API for adminDashboard in the system"
    }
}
exports.path = () => {
    return {
        // "/adminDashboard": {
        //     "get": {
        //         "tags": ["AdminDashboard"],
        //         "security": [
        //             {
        //                 "bearerAuth": []
        //             }
        //         ],
        //         "summary": "get all adminDashboard",
        //         "responses": {
        //             "200": {
        //                 "description": "OK"
        //             },
        //             // "422": {
        //             //   "$ref": "#/definitions/responses/UnprocessableEntity"
        //             // },
        //             // "401": {
        //             //   "$ref": "#/definitions/responses/UnauthorizedError"
        //             // }
        //         }
        //     },
        //     "post": {
        //         "tags": ["AdminDashboard"],
        //         "summary": "create adminDashboard",
        //         "security": [
        //             {
        //                 "bearerAuth": []
        //             }
        //         ],
        //         "requestBody": {
        //             "required": true,
        //             "content": {
        //                 "application/json": {
        //                     "schema": {
        //                         "$ref": "#/definitions/AdminDashboard"
        //                     }
        //                 }
        //             }
        //         },
        //         "responses": {
        //             "200": {
        //                 "description": "OK",
        //                 "schema": {
        //                     "$ref": "#/definitions/AdminDashboard"
        //                 }
        //             },
        //             "422": {
        //                 "$ref": "#/definitions/responses/UnprocessableEntity"
        //             }
        //         }
        //     }
        // },
        // "/adminDashboard/{id}": {
        //     "get": {
        //         "tags": ["AdminDashboard"],
        //         "security": [
        //             {
        //                 "bearerAuth": []
        //             }
        //         ],
        //         "summary": "get details adminDashboard",
        //         "parameters": [
        //             {
        //                   "name": "id",
        //                   "in": "path",
        //                   "description": "id of adminDashboard",
        //                   "required": true,
        //             }
        //         ],
        //         "responses": {
        //             "200": {
        //                 "description": "OK"
        //             },
        //             "422": {
        //                 "$ref": "#/definitions/responses/UnprocessableEntity"
        //             },
        //             "401": {
        //                 "$ref": "#/definitions/responses/UnauthorizedError"
        //             }
        //         }
        //     },
        //     "delete": {
        //         "tags": ["AdminDashboard"],
        //         "security": [
        //             {
        //                 "bearerAuth": []
        //             }
        //         ],
        //         "summary": "delete adminDashboard",
        //         "parameters": [
        //             {
        //                 "name": "id",
        //                 "in": "path",
        //                 "description": "id of adminDashboard",
        //                 "required": true,
        //             }
        //         ],
        //         "responses": {
        //             "200": {
        //                 "description": "OK",
        //                 "schema": {
        //                     "$ref": "#/definitions/AdminDashboard"
        //                 }
        //             },
        //             "422": {
        //                 "$ref": "#/definitions/responses/UnprocessableEntity"
        //             },
        //             "401": {
        //                 "$ref": "#/definitions/responses/UnauthorizedError"
        //             }
        //         }
        //     },
        //     "put": {
        //         "tags": ["AdminDashboard"],
        //         "security": [
        //             {
        //                 "bearerAuth": []
        //             }
        //         ],
        //         "parameters": [
        //             {
        //                 "name": "id",
        //                 "in": "path",
        //                 "description": "id of adminDashboard",
        //                 "required": true,
        //             }
        //         ],
        //         "summary": "update details adminDashboard",
        //         "requestBody": {
        //             "required": true,
        //             "content": {
        //                 "application/json": {
        //                     "schema": {
        //                         "$ref": "#/definitions/AdminDashboard"
        //                     }
        //                 }
        //             }
        //         },
        //         "responses": {
        //             "200": {
        //                 "description": "OK",
        //                 "schema": {
        //                     "$ref": "#/definitions/AdminDashboard"
        //                 }
        //             },
        //             "422": {
        //                 "$ref": "#/definitions/responses/UnprocessableEntity"
        //             },
        //             "401": {
        //                 "$ref": "#/definitions/responses/UnauthorizedError"
        //             }
        //         }
        //     },
        // },
    }
}
exports.definition = () => {
    return {
        "AdminDashboard": {
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