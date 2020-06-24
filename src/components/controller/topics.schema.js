module.exports = class Schema {
    constructor() { }
    static createSchema = {
        type: 'object',
        properties: {
            title: { type: 'string' }
        },
        required: ['title']
    }
    static creataAdminSchema = {
        type: 'object',
        properties: {
            title: { type: 'string' },
            voca: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        text: { type: 'string' },
                        kanji_text: { type: 'string' },
                        kanji_meaning: { type: 'string' },
                        vocabulary_meaning: { type: 'string' },
                    },
                    required:['text','kanji_text','kanji_meaning','vocabulary_meaning']
                }
            }
        },
        required:['title','voca']
    }
}