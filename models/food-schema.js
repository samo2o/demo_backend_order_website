const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    food_name: { type: String, required: true },
    ingredients: {
        type: [{ 
            'ingredient': { type: Schema.Types.Mixed, required: true },
            'quantity': { type: Number, required: false, default: 1 }
        }],
        required: true
    },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Food', FoodSchema);
