const fs = require('fs')
const _ = require('lodash')
const regisDocs = function () {
    const modules = fs.readdirSync(__dirname);
    modules.splice(modules.indexOf('index.js'), 1)
    let swagger = {
        "openapi": "3.0.0",
        "info": {
            "version": "1.0.0",
            "title": "API learn japanese",
            "description": "document for api , every question, please contact for me, my Email: vanlam0145@gmail.com ",
            "license": {
                "name": "or for my FB: Lâm Hứa",
                "url": "https://fb.com/lam.hua.1903"
            }
        },
        "servers": [
            {
                "url": "http://localhost:4000/api",
                //"description": "With docker-compose and nginx proxy"
            }
        ],
        "components": {
            "securitySchemes": {
                "bearerAuth": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT"
                }
            }
        },
        "consumes": ["application/json"],
        "produces": ["application/json"],
    }
    let tags = [];
    let paths = {};
    let definitions = {};
    definitions.responses = {
        "UnauthorizedError": {
            "description": "Access token is missing or invalid"
        },
        "UnprocessableEntity": {
            "description": "${field} is required"
        }
    }
    for (let r of modules) {
        const routerName = r.split('.')[0];
        const RouterName = (_.compact(routerName).splice(0, 1)).join("").toUpperCase() + (_.compact(routerName).splice(1, (_.compact(routerName)).length)).join("")
        tags.push(require(`./${r}`).tag())
        const definitionName = Object.keys(require(`./${r}`).definition())
        for (let name of definitionName) {
            definitions[`${name}`] = require(`./${r}`).definition()[`${name}`]
        }
        const pathName = Object.keys(require(`./${r}`).path())
        for (let name of pathName) {
            paths[`${name}`] = require(`./${r}`).path()[`${name}`]
        }

    }
    swagger.tags = tags
    swagger.paths = paths
    swagger.definitions = definitions
    return swagger
}
const regisDoc = regisDocs();
module.exports = regisDoc