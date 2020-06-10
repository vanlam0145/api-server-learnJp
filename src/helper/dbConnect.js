require('dotenv').config()
//console.log(process.env.MONGODB_URL)
const mongoose = require('mongoose')

const run = function () {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err)
            run()
        console.log('mongoo connect!')
    });
}
run()