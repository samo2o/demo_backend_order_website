const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const checkAuth = require('../models/check-auth');
const { orderFood, getMenu, getUserOrders, userReceivedMark } = require('../controllers/food-controllers');

router.get('/', getMenu); // get all food menu

router.use(checkAuth);

router.get('/my-orders', getUserOrders);

// order
router.post(
    '/order/:fid',
    [
        check('quantity').notEmpty(),
        check('address').notEmpty(),
        check('date').notEmpty()
    ],
    orderFood
);

// received
router.post(
    '/order/received/:oid',
    [
        check('newStatus').notEmpty()
    ],
    userReceivedMark
);

module.exports = router;
