const Article = require("../models/article.model")
const bcrypt = require("bcryptjs")
const {unlink} = require("node:fs")

class ArticlesCtrl {
    list = async (req, res, next) => {
        try {
            const articles = await Article.find()

            res.send(articles)
        } catch(e) {
            next({message: e.message, status: 400})
        }
    }
    
    store = async (req, res, next) => {
        try {
            const {title, content} = req.body

            const image = req.file.filename

            await Article.create({title, content, image})

            res.status(201)
            res.send({'success': 'Article created.'})
        } catch (e) {
            next({ message: e.message, status: 400 })
        }
    }
    
    update = async (req, res, next) => {
        try {
            const article = await Article.findById(req.params.id)

            if(article) {
                const {title, content} = req.body

                let data = {}

                if(req.file) {
                    const image = req.file.filename
                    data = {title, content, image}

                    unlink('./uploads/'+article.image, err => console.log(err))
                } else {
                    data = {title, content}
                }

                await Article.findByIdAndUpdate(article._id, data)

                res.send({success: 'Article updated.'})
            } else {
                next({message: 'Article not found.', status: 404})
            }
        } catch (e) {
            next({ message: e.message, status: 400 })
        }
    }
    
    delete = async (req, res, next) => {
        try {
            const article = await Article.findById(req.params.id)

            if (article) {
                unlink('./uploads/' + article.image, err => console.log(err))

                await Article.findByIdAndDelete(article._id)

                res.send({ success: 'Article deleted.' })
            } else {
                next({ message: 'Article not found.', status: 404 })
            }
        } catch (e) {
            next({ message: e.message, status: 400 })
        }
    }
    
    show = async (req, res, next) => {
        try {
            const article = await Article.findById(req.params.id)

            if(article) {
                res.send(article)
            } else {
                next({ message: 'Article not found.', status: 404 })
            }
        } catch (e) {
            next({ message: e.message, status: 400 })
        }
    }
}

module.exports = new ArticlesCtrl