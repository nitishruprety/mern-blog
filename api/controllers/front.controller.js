const Comment = require('../models/comment.model')
const ArticlesCtrl = require('./articles.controller')

class FrontCtrl {
    articles = async (req, res, next) => await ArticlesCtrl.list(req, res, next)
    
    article = async (req, res, next) => await ArticlesCtrl.show(req, res, next)

    comment = async (req, res, next) => {
        try {
            const {content, name, articleId} = req.body

            await Comment.create({content, name, articleId})

            res.send({success: 'Thank you for your comment.'})
        } catch(e) {
            next({message: e.message, status: 400})
        }
    }

    comments = async (req, res, next) => {
        try {
            const comments = await Comment.find({articleId: req.params.id}).exec()

            res.send(comments)
        } catch (e) {
            next({ message: e.message, status: 400 })
        }
    }

    image = async (req, res, next) => {
        try {
            res.sendFile(`uploads/${req.params.filename}`, {
                root: './'
            })
        } catch (e) {
            next({ message: e.message, status: 400 })
        }
    }
}

module.exports = new FrontCtrl