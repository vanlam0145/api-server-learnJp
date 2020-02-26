const fs = require('fs')
const mongoose = require('mongoose')
const challengeModel = require('../src/components/model/challenges.model')
const datachallenge = JSON.parse(fs.readFileSync('./assets/challenge.json', {encoding: 'utf8'}))
mongoose.connect('mongodb+srv://admin:admin@cluster0-cgqit.mongodb.net/learnJP?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err)
        throw err
    console.log('mongoo connect!')
});
async function impor() {
    await challengeModel.deleteMany({}).exec();
    for (let challenge of datachallenge) {
        await challengeModel.create(challenge)
    }
}
impor()