module.exports = class Schema {
    constructor() {
        this.createSchema = {
            type: 'object',
            properties: {
                title: {type: 'string'},
                content: {
                    type: 'array',
                    items: [{
                        type: 'object',
                        properties: {
                            text: {type: 'string'},
                            mean: {type: 'string'},
                        },
                        required: ['text', 'mean']
                    }]
                }
            },
            required: ['title', 'content']
        }
        this.updateContentOnCourse = {
            type: 'object',
            properties: {
                course_id: {type: 'string'},
                contents: {
                    type: 'array',
                    items: [{type: 'string'}]
                },
                isAdd: {type: 'boolean'}
            },
            required: ['course_id', 'contents']
        }
        this.updateContentOnCourseisAdd = {
            type: 'object',
            properties: {
                course_id: {type: 'string'},
                contents: {
                    type: 'object',
                    properties: {
                        text: {type: 'string'},
                        mean: {type: 'string'}
                    },
                    required: ["text", "mean"]
                },
                isAdd: {type: 'boolean'}
            },
            required: ['course_id', 'contents']
        }
        this.deleteContentCourse = {
            type: 'object',
            properties: {
                id_content: {type: 'string'}
            },
            required: ["id_content"]
        }
    }

}