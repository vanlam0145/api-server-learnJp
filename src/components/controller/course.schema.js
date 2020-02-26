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
    }

}