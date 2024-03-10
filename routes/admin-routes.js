const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const { addNewFood, editFood, removeFood, deliverOrder, getAllOrders } = require('../controllers/food-controllers');
const checkAdmin = require('../models/check-admin');

router.use(checkAdmin);

// get all orders
router.get('/order', getAllOrders);

// add new food
router.post(
    '/food/add',
    [
        check('food_name').isLength({ min: 3, max: 50 }),
        check('ingredients').notEmpty(),
        check('price').notEmpty()
    ],
    addNewFood
);

// edit a food data
router.patch(
    '/food/:fid',
    [
        check('food_name').isLength({ min: 3, max: 50 }),
        check('ingredients').notEmpty(),
        check('price').notEmpty()
    ],
    editFood
);

// delete a food data
router.delete('/food/:fid', removeFood);

// set order status to delivering by an admin
router.post(
    '/order/deliver/:oid',
    [
        check('newStatus').notEmpty()
    ],
    deliverOrder
);

module.exports = router;
