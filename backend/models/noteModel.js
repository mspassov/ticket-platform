const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'tickets'
    },
    text: {
        type: String,
        required: true,
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('notes', noteSchema);