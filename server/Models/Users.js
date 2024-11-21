const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    }
}, {timestamps : true}
)
module.exports = mongoose.model('users', UsersSchema)