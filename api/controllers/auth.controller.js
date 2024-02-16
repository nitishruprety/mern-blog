const User = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class AuthCtrl {

    login = async(req, res, next) => {
        try {
            const {email, password} = req.body

            const user = await User.findOne({email}).select('+password').exec()

            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({
                        uid: user._id,
                        iat: Math.floor(Date.now() / 1000),
                        exp: Math.floor(Date.now() / 1000) + (30*24*60*60)
                    }, 'sndklfgnlksdbgflkbsdkjgfbsdjgnkljsdbgkjdbgkdfbgklb')

                    res.send({token})
                } else {
                    next({ message: 'Incorrect password.', status: 422 })
                }
            } else {
                next({message: 'Incorrect email.', status: 422})
            }
        } catch(e) {
            next({message: e.message, status: 400})
        }
    }
    
    user = async(req, res, next) => {
        res.send(req.user)
    }

}

module.exports = new AuthCtrl