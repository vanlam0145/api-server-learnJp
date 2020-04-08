const fs = require('fs')
const mongoose = require('mongoose')
const UserModel = require('../src/components/model/users.model')
//const datachallenge = JSON.parse(fs.readFileSync('./assets/challenge.json', { encoding: 'utf8' }))
mongoose.connect('mongodb+srv://admin:admin@cluster0-cgqit.mongodb.net/learnJP?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err)
        throw err
    console.log('mongoo connect!')
});
async function impor() {
    const update = await UserModel.updateMany({}, { $set: { role: 'user' } }, { new: true })
    console.log(update)
}
impor()