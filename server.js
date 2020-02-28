'use strict'
require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path')
const route = require('./src/components/router')
const mongoose = require('mongoose')
const morgan = require('morgan')
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const swaggerui = require('swagger-ui-express')
const http = require('http')
const cors = require('cors');
const {User} = require('./src/helper/user.socket')
const port = process.env.PORT
mongoose.connect('mongodb+srv://admin:admin@cluster0-cgqit.mongodb.net/learnJP?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err)
        throw err
    console.log('mongoo connect!')
});
app.use('*', cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/api/assets', express.static(path.join(__dirname, 'assets')))
app.use('/api/docs', swaggerui.serve, swaggerui.setup(require('./swagger.json'), {explorer: true}))
app.use('/api', route)

const server = http.createServer(app)
const secureIO = socketIO(server);
require('./src/socket/userCommant.socket')(secureIO, User)
server.listen(port, () => {console.log(`port runing port: ${port}`)})

