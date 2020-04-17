module.exports = class Schema {
    constructor() { }
    static createSchema = {
        type: 'object',
        properties: {
            title: { type: 'string' }
        },
        required: ['title']
    }

}