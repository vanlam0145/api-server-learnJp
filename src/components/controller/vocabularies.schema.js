module.exports = class Schema {
    constructor() { }
    static createSchema = {
        type: 'object',
        properties: {
            text: { type: 'string' },
            kanji_text: { type: 'string' },
            kanji_text: { type: 'string' },
            vocabulary_meaning: { type: 'string' },
            topicId: { type: 'string' }
        },
        required: ['text', 'topicId']
    }

}