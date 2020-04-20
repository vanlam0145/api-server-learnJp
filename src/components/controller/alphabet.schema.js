module.exports = class Schema {
    constructor() { }
    static createSchema = {
        type: 'object',
        properties: {
            //name: {type: 'string'},
        },
        //required: ['name']
    }
    static updateSchema = {
        type: 'object',
        properties: {
            description: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                    }
                }
            }
        },
        required: ['description']
    }
}