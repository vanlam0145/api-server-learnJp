module.exports = class Schema {
    constructor() { }
    static createSchema = {
        type: 'object',
        properties: {
            name: { type: 'string' },
            id: { type: 'string' },
            type: { type: 'string', enum: ['image', 'video', 'mp3', 'pdf', 'excel', 'txt'], default: 'image' },
        },
        required: ['name', 'id', 'type']
    }
}