module.exports = class Schema {
    constructor() {
    }
    static createSchema = {
        type: 'object',
        properties: {
            accusedId: { type: 'string' },
            commentId: { type: 'string' },
            content: { type: 'string' }
        },
        required: ['accusedId', 'commentId', 'content']
    }

}