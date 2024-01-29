const {Schema, model} = require('mongoose')

const Comment = model('Comment', new Schema({
    content: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    articleId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Article'
    },
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
}))

module.exports = Comment