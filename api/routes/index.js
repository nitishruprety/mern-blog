const router = require('express').Router()
const UsersCtrl = require('../controllers/users.controller')
const AuthCtrl = require('../controllers/auth.controller')

router.route('/users')
    .get(UsersCtrl.list)
    .post(UsersCtrl.store)

router.route('/users/:id')
    .get(UsersCtrl.show)
    .put(UsersCtrl.update)
    .patch(UsersCtrl.update)
    .delete(UsersCtrl.delete)

router.post('/login', AuthCtrl.login)

router.use((req, res, next) => {
    next({status: 404, message: 'Resource not found.'})
})

module.exports = router