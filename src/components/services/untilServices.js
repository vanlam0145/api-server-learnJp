const Ajv = require('ajv');
const AjvError = require("ajv-errors");
const AjvKeyWords = require("ajv-keywords");
const { ErrorService } = require('../../helper/errorService')
exports.validateJson = (schema, body) => {
    const ajv = new Ajv({ allErrors: true, jsonPointers: true })
    AjvError(ajv, { singleError: true });
    AjvKeyWords(ajv, ["switch"]);
    const valid = ajv.validate(schema, body);
    if (!valid) throw ErrorService.requestDataInvalid(ajv.errorsText())
}
exports.exec = async (promise) => {
    try {
        const result = await promise;
        if ((result === undefined || result === null) && !option.allowNull) {
            throw ErrorService.mgRecoredNotFound();
        }
        return result;
    } catch (err) {
        if (err.info) {
            console.log("err 1", err)
            throw err
        };
        console.log('err', err);
        if (err.code == 11000)
            throw ErrorService.somethingWentWrong(err.errmsg)
        else throw ErrorService.somethingWentWrong(err.message)
    }
}