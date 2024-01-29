const router = require('express').Router()

router.post('/:id', (req, res, next) => {
    res.send({
        query: req.query,
        params: req.params,
        body: req.body,
    })
})

router.use((req, res, next) => {
    next({status: 404, message: 'Resource not found.'})
})

module.exports = router