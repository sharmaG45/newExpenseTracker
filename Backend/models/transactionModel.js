const mongoose = require('mongoose')

const transectionSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    amount: {
        type: Number,
        required: [true, 'amount is required']
    },
    category: {
        type: String,
        required: [true, 'category is required']
    },
    date: {
        type: Date,
        required: [true, 'date is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    }
}, { timestamps: true })

const transectionModel = mongoose.model('transections', transectionSchema)
module.exports = transectionModel