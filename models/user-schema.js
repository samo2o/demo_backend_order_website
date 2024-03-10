const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    admin: { type: Boolean, required: true, default: false },
    orders: { type: [mongoose.Types.ObjectId], required: false, ref: 'Orders', default: [] }
});

module.exports = mongoose.model('Users', UserSchema);
