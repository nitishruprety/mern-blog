const {Schema, model} = require('mongoose')

const Article = model('Article', new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
}))

module.exports = Article