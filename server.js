'use strict'
require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path')
const route = require('./src/components/router')
const morgan = require('morgan')

const bodyParser = require('body-parser');
const swaggerui = require('swagger-ui-express')
const http = require('http')
const cors = require('cors');

require('./src/helper/dbConnect')

const doc = require('./src/doc')
const { serverWithPort } = require('./src/helper/until')
const port = process.env.PORT

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/api/assets', express.static(path.join(__dirname, 'assets')))
app.use('/api/docs', swaggerui.serve, swaggerui.setup(doc, { explorer: true }))
app.use('/api', route)

const server = http.createServer(app)

require('./src/socket/userCommant.socket')(server)
server.listen(port, () => { console.log(`server runing : ${serverWithPort(port)}`) })

