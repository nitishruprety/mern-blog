const router = require('express').Router()
const UsersCtrl = require('../controllers/users.controller')
const ArticlesCtrl = require('../controllers/articles.controller')
const FrontCtrl = require('../controllers/front.controller')
const AuthCtrl = require('../controllers/auth.controller')
const { auth, upload } = require('../lib')

// CMS URLs
router.route('/users')
    .get(auth, UsersCtrl.list)
    .post(auth, UsersCtrl.store)

router.route('/users/:id')
    .get(auth, UsersCtrl.show)
    .put(auth, UsersCtrl.update)
    .patch(auth, UsersCtrl.update)
    .delete(auth, UsersCtrl.delete)

router.route('/articles')
    .get(auth, ArticlesCtrl.list)
    .post(auth, upload.single('image'), ArticlesCtrl.store)

router.route('/articles/:id')
    .get(auth, ArticlesCtrl.show)
    .put(auth, upload.single('image'), ArticlesCtrl.update)
    .patch(auth, upload.single('image'), ArticlesCtrl.update)
    .delete(auth, ArticlesCtrl.delete)

router.post('/login', AuthCtrl.login)

// Front URLs
router.get('/article/all', FrontCtrl.articles)
router.get('/article/:id', FrontCtrl.article)
router.get('/comments/:id', FrontCtrl.comments)
router.post('/comments', FrontCtrl.comment)
router.get('/image/:filename', FrontCtrl.image)

router.use((req, res, next) => {
    next({status: 404, message: 'Resource not found.'})
})

module.exports = router