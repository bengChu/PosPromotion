const mongoose = require('mongoose')

const DocumentStatusSchema = mongoose.Schema({
    Id: {
        type: Number
    },
    Name: {
        type: String
    },
}
)
module.exports = mongoose.model('DocumentStatuss', DocumentStatusSchema)