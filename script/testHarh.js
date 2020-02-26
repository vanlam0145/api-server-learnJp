const bcrypt=require('bcryptjs')
const mongoose = require('mongoose')
const userModel = require('../src/components/model/users.model')
mongoose.connect('mongodb+srv://admin:admin@cluster0-cgqit.mongodb.net/learnJP?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err)
        throw err
    console.log('mongoo connect!')
});
const name="test"
const password="123"
async function aa(){
const  hashPass = await  bcrypt.hashSync(password, 10) 
console.log(hashPass)
}
aa()