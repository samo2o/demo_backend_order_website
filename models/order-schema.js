const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    food: { type: mongoose.Types.ObjectId, ref: 'Food', required: true },
    quantity: { type: Number, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' },
    address: { type: String, required: true }
});

module.exports = mongoose.model('Orders', OrderSchema);
