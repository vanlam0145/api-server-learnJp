module.exports = class Schema {
    constructor() { }
    static createSchema = {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email' },
            username: { type: 'string' },
            password: { type: 'string' },
            phoneNumber: { type: 'string', minLength: 9 },
        },
        required: ['email', 'username', 'password']
    }
}