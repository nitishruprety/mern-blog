const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const multer = require('multer')

const auth = async (req, res, next) => {
    try {
        const authorize = req.headers['authorization']

        if(authorize) {
            const token = authorize.split(' ').pop()

            jwt.verify(token, 'sndklfgnlksdbgflkbsdkjgfbsdjgnkljsdbgkjdbgkdfbgklb', async (err, data) => {
                if(err) {
                    next({message: 'Invalid token.', status: 401})
                } else {
                    const user = await User.findById(data.uid)

                    if(user) {
                        req.user = user

                        next()
                    } else {
                        next({ message: 'Invalid token.', status: 401 })
                    }
                }
            })
        } else {
            next({ message: 'Authorization header missing.', status: 401 }) 
        }
    } catch(e) {
        next({message: e.message, status: 400})
    }
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads')
        },
        filename: (req, file, cb) => {
            const ext = file.originalname.split('.').pop()

            cb(null, `img${Math.floor(Date.now()/1000)}.${ext}`)
        }
    }),
    fileFilter: (req, file, cb) => {
        if(file.mimetype.startsWith('image')) {
            cb(null, true)
        } else {
            let err = new Error('File must be an image.')
            err.status = 422
            
            cb(err)
        }
    }
})

module.exports = {auth, upload}