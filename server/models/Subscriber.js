const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
}, { timestamps: true})


const Subscriber = mongoose.model('subscriber', subscriberSchema);

module.exports = { Subscriber }