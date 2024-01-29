const User = require("../models/user.model")
const bcrypt = require("bcryptjs")

class UsersCtrl {
    list = async (req, res, next) => {
        try {
            const users = await User.find()

            res.send(users)
        } catch(e) {
            next({message: e.message, status: 400})
        }
    }
    
    store = async (req, res, next) => {
        try {
            const {name, email, password, phone, address} = req.body

            const hashed = bcrypt.hashSync(password, 10)

            await User.create({name, email, phone, address, password: hashed})

            res.status(201)
            res.send({'success': 'User created.'})
        } catch (e) {
            next({ message: e.message, status: 400 })
        }
    }
    
    update = async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id)

            if(user) {
                const {name, email, phone, address} = req.body

                await User.findByIdAndUpdate(user._id, {name, email, phone, address})

                res.send({success: 'User updated.'})
            } else {
                next({message: 'User not found.', status: 404})
            }
        } catch (e) {
            next({ message: e.message, status: 400 })
        }
    }
    
    delete = async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id)

            if (user) {
                await User.findByIdAndDelete(user._id)

                res.send({ success: 'User deleted.' })
            } else {
                next({ message: 'User not found.', status: 404 })
            }
        } catch (e) {
            next({ message: e.message, status: 400 })
        }
    }
    
    show = async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id)

            if(user) {
                res.send(user)
            } else {
                next({ message: 'User not found.', status: 404 })
            }
        } catch (e) {
            next({ message: e.message, status: 400 })
        }
    }
}

module.exports = new UsersCtrl