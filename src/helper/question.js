//const config = require('../config');
//const avatarCtrl = require('../components/avatars/avatar.controller')
// shuffle question
exports.shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

exports._makeQuestion = (params = {}, contents) => {
    return this.shuffle(contents).slice(0, params.numberQuestion || contents.length).map(question => {
        let arrQuestions = contents.filter(item => item._id !== question._id)
        const answers = this.shuffle([question, ...this.shuffle(arrQuestions)].slice(0, params.numberAnswer || 4))
        const answer_id = answers.findIndex((answer) => answer._id === question._id);
        arrQuestions.splice(answer_id, 1);
        return {
            question: question.text,
            _id: question._id,
            //answers: answers.map(item => !params.type ? item.mean : { _id: item._id, answer: avatarCtrl.getImgUrl(item.avatar) }),
            answers: answers.map(
                item =>
                    (params.type && params.userForWeb && { _id: item._id, answer: item.meaning })
                    ||
                    (!params.type && item.mean)
                //||
                //{ _id: item._id, answer: avatarCtrl.getImgUrl(item.avatar) }
            ),
            answer_id
        }
    })
}