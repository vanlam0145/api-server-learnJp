const { resErrorModify } = require('../helper/until')
module.exports.BaseRoute = class {
    constructor() { }
    static routeModify(func) {
        return (req, res) => {
            func
                .bind(this)(req, res)
                .catch(error => {
                    resErrorModify(res, {
                        code: error.code ? error.code : 500,
                        message: error.message ? error.message : error
                    })
                })
        }
    }
}