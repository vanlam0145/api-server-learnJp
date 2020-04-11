module.exports = class Schema {
    constructor() { }
    static createSchema = {
        type: 'object',
        properties: {
            name: { type: 'string' },
        },
        required: ['name']
    }
}