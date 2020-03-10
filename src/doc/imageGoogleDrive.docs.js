exports.tag = () => {
    return {
        "name": "ImageGoogleDrive",
        "description": "API for imageGoogleDrive in the system"
    }
}
exports.path = () => {
    return {
        "/imageGoogleDrive": {
            "get": {
                "tags": ["ImageGoogleDrive"],
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "summary": "get all imageGoogleDrive of user",
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
            // "post": {
            //     "tags": ["ImageGoogleDrive"],
            //     "summary": "create imageGoogleDrive",
            //     "requestBody": {
            //         "required": true,
            //         "content": {
            //             "application/json": {
            //                 "schema": {
            //                     "$ref": "#/definitions/ImageGoogleDrive"
            //                 }
            //             }
            //         }
            //     },
            //     "responses": {
            //         "200": {
            //             "description": "OK",
            //             "schema": {
            //                 "$ref": "#/definitions/ImageGoogleDrive"
            //             }
            //         },
            //         "422": {
            //             "$ref": "#/definitions/responses/UnprocessableEntity"
            //         }
            //     }
            // }
        },
        // "/imageGoogleDrive/{id}": {
        //     "get": {
        //         "tags": ["ImageGoogleDrive"],
        //         "security": [
        //             {
        //                 "bearerAuth": []
        //             }
        //         ],
        //         "summary": "get details imageGoogleDrive",
        //         "parameters": [
        //             {
        //                 //them vao sau
        //                 //   "name": "id",
        //                 //   "in": "path",
        //                 //   "description": "id of topic",
        //                 //   "required": true,
        //                 //   "type": "integer",
        //                 //   "format": "int64"
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
        //         "tags": ["ImageGoogleDrive"],
        //         "security": [
        //             {
        //                 "bearerAuth": []
        //             }
        //         ],
        //         "summary": "delete imageGoogleDrive",
        //         "parameters": [
        //             {
        //                 // "name": "id",
        //                 // "in": "path",
        //                 // "description": "id of imageGoogleDrive",
        //                 // "required": true,
        //                 // "type": "integer",
        //                 // "format": "int64"
        //             }
        //         ],
        //         "responses": {
        //             "200": {
        //                 "description": "OK",
        //                 "schema": {
        //                     "$ref": "#/definitions/ImageGoogleDrive"
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
        //         "tags": ["ImageGoogleDrive"],
        //         "security": [
        //             {
        //                 "bearerAuth": []
        //             }
        //         ],
        //         "summary": "update details imageGoogleDrive",
        //         "requestBody": {
        //             "required": true,
        //             "content": {
        //                 "application/json": {
        //                     "schema": {
        //                         "$ref": "#/definitions/ImageGoogleDrive"
        //                     }
        //                 }
        //             }
        //         },
        //         "responses": {
        //             "200": {
        //                 "description": "OK",
        //                 "schema": {
        //                     "$ref": "#/definitions/ImageGoogleDrive"
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
        "ImageGoogleDrive": {
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