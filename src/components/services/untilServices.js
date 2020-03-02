const Ajv = require('ajv');
const AjvError = require("ajv-errors");
const AjvKeyWords = require("ajv-keywords");
const errorService = require('../../helper/errorService')
exports.validateJson = (schema, body) => {
    const ajv = new Ajv({allErrors: true, jsonPointers: true})
    AjvError(ajv, {singleError: true});
    AjvKeyWords(ajv, ["switch"]);
    const valid = ajv.validate(schema, body);
    return {
        isValid: valid,
        message: ajv.errorsText()
    }
}
exports.exec = async (promise) => {
    try {
        const result = await promise;
        if ((result === undefined || result === null) && !option.allowNull) {
            console.log("nhay vao day?")
            throw errorService.mgRecoredNotFound();
        }
        return result;
    } catch (err) {
        if (err.info) {
            console.log("err 1", err)
            throw err
        };
        console.log('err', err);
        if (err.code == 11000)
            return errorService.error.anyError(err.errmsg, 500)
        else return errorService.error.somethingWentWrong(err.errors)

    }
}