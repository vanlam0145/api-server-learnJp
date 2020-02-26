const fs = require('fs')
const express = require('express')

const regisRouter = function () {
    const modules = fs.readdirSync(__dirname);
    modules.splice(modules.indexOf('index.js'), 1)
    const route = express.Router();
    for (let r of modules) {
        const routerName = r.split('.')[0];
        route.use(`/${routerName}`, require(`./${routerName}.router.js`)())
    }
    return route
}
const regisRoute = regisRouter();
module.exports = regisRoute;