module.exports = class Schema {
    constructor() {
        this.createSchema = {
            type: 'object',
            properties: {
                idChallenge: {type: 'string'},
                content: {type: 'string'},
            },
            required: ['idChallenge', 'content']
        }
    }

}