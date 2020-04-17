module.exports = class Schema {
    constructor() {
    }
    static createSchema = {
        type: 'object',
        properties: {
            commentId: { type: 'string' },
            content: { type: 'string' }
        },
        required: ['commentId', 'content']
    }

}