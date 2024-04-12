const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    product: {
        type: String,
        required: true,
        enum: ['Windows', 'Apple', 'Linux', 'Android']
    },
    description: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum: ['New', 'Open', 'In Progress', 'Resolved'],
        default: 'New'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('tickets', ticketSchema);