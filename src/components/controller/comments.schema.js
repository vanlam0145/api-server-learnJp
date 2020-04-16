module.exports = class Schema {
    constructor() { }
    static createSchema = {
        type: 'object',
        properties: {
            idChallenge: { type: 'string' },
            content: { type: 'string' }
        },
        required: ['idChallenge', 'content']
    }
}