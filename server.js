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
const socketIO = require('socket.io');
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
app.get('/google06408e9b745b9367.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'google06408e9b745b9367.html'))
})
const server = http.createServer(app)
const io = socketIO(server);
require('./src/socket')(io)
server.listen(port, () => { console.log(`server runing : ${serverWithPort(port)}`) })

module.exports = { io: io }

