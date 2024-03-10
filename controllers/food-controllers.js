const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const Food = require("../models/food-schema");
const Order = require("../models/order-schema");
const User = require("../models/user-schema");

const getMenu = async (req, res, next) => {
    let menu;
    try {
        menu = await Food.find();
    } catch (error) {
        return next(
            error || 'Something went wrong while getting the menu data. Please try again later.'
        )
    }

    if (!menu) {
        return next(
            new HttpError(
                'No menu data was returned. Please try again later.',
                404
            )
        );
    }

    res.json({
        menu: menu.map(item => item.toObject({ getters: true }))
    });
}

const getUserOrders = async (req, res, next ) => {
    if (!req.userData.userId) {
        return next(
            new HttpError(
                'No user ID was provided. Please login or re-login and try again.',
                400
            )
        );
    }

    let ordersExists;
    try {
        ordersExists = await User.findById(req.userData.userId).populate('orders');
    } catch (error) {
        return next(
            error || 'Something went wrong while getting the user orders. Please try again later.'
        );
    }

    res.json({
        orders: ordersExists.orders.map(item => item.toObject({ getters: true }))
    });
}

const orderFood = async (req, res, next) => {
    const foodId = req.params.fid;
    if (!foodId) {
        return next(
            new HttpError(
                'No food ID was provided. Please check your inputs and try again.',
                400
            )
        );
    }

    const { quantity, address, date } = req.body;

    let food;
    try {
        food = await Food.findById(foodId);
    } catch (error) {
        return next(
            error || 'Something went wrong while getting the food data. Please try again later.'
        )
    }

    if (!food) {
        return next(
            new HttpError(
                'No food data was found.',
                404
            )
        );
    }

    const createdOrder = new Order({
        food: food,
        quantity: quantity,
        address: address,
        date: date
    });

    let sess;
    try {
        sess = await mongoose.startSession();
        sess.startTransaction();
        await createdOrder.save({ session: sess });
        // const currentUserOrders = await User.findById(req.userData.userId);
        await User.findByIdAndUpdate(req.userData.userId, { $push: { orders: createdOrder.id } }, { session: sess })
        await sess.commitTransaction();
    } catch (error) {
        return next(
            error || 'Something went wrong while saving the order. Please try again later.'
        )
    } finally {
        if (sess) {
            await sess.endSession();
        }
    }

    res.json({
        message: 'Order was sent successfully.'
    });
}

const addNewFood = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            'Invalid inputs. Please check your inputs and try again.',
            400
        );
    }

    const { food_name, ingredients, price } = req.body;

    let foodExists;
    try {
        foodExists = await Food.findOne({ food_name: food_name });
    } catch (error) {
        return next(
            errors || 'Something went wrong while checking for food data. Please try again later.'
        )
    }

    if (foodExists) {
        return next(
            new HttpError(
                'The provided food name was already exists in the database. Please enter another food name.',
                400
            )
        );
    }

    const createdFood = new Food({
        food_name: food_name,
        ingredients: ingredients,
        price: price
    });

    let sess;
    try {
        sess = await mongoose.startSession();
        sess.startTransaction();
        await createdFood.save({ session: sess });
        await sess.commitTransaction();
    } catch (error) {
        return next(
            error || 'Something went wrong while saving the new data. Please try again later.'
        )
    } finally {
        if (sess) {
            await sess.endSession();
        }
    }

    res.status(201).json({
        message: 'New food data was added and saved successfully.'
    })
}

const editFood = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            'Invalid inputs. Please check your inputs and try again.',
            400
        );
    }

    const foodId = req.params.fid;
    if (!foodId) {
        return next(
            new HttpError(
                'No food ID was provided. Please check your inputs and try again.',
                400
            )
        );
    }

    const { food_name, ingredients, price } = req.body;

    // let foodExists;
    // try {
    //     foodExists = await Food.findById(foodId);
    // } catch (error) {
    //     return next(
    //         errors || 'Something went wrong while checking for food data. Please try again later.'
    //     )
    // }

    // if (!foodExists) {
    //     return next(
    //         new HttpError(
    //             'No food data was found.',
    //             400
    //         )
    //     );
    // }

    // const edittedFood = new Food({
    //     food_name: food_name,
    //     ingredients: ingredients,
    //     price: price
    // });

    let sess;
    try {
        sess = await mongoose.startSession();
        sess.startTransaction();
        await Food.findByIdAndUpdate(foodId, {
            food_name: food_name,
            ingredients: ingredients,
            price: price
        }, { session: sess });
        await sess.commitTransaction();
    } catch (error) {
        return next(
            error || 'Something went wrong while saving the new data. Please try again later.'
        )
    } finally {
        if (sess) {
            await sess.endSession();
        }
    }

    res.status(200).json({
        message: 'Food data was saved successfully.'
    })
}

const removeFood = async (req, res, next) => {
    const foodId = req.params.fid;
    if (!foodId) {
        return next(
            new HttpError(
                'No food ID was provided. Please check your inputs and try again.',
                400
            )
        );
    }

    let sess;
    try {
        sess = await mongoose.startSession();
        sess.startTransaction();
        await Food.findByIdAndDelete(foodId);
        await sess.commitTransaction();
    } catch (error) {
        return next(
            error || 'Something went wrong while deleting the food data. Please try again later.'
        )
    } finally {
        if (sess) {
            await sess.endSession();
        }
    }

    res.json({
        message: 'Food data was deleted successfully.'
    })
}

const deliverOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            'Invalid inputs. Please check your inputs and try again.',
            400
        );
    }

    const orderId = req.params.oid;
    if (!orderId) {
        return next(
            new HttpError(
                'No order ID was provided. Please check your inputs and try again.',
                400
            )
        );
    }

    const { newStatus } = req.body;

    if (!['pending', 'delivering', 'completed', 'canceled', 'received'].includes(newStatus)) {
        return next(
            new HttpError(
                'Invalid order status. Please check your inputs and try again.',
                400
            )
        )
    }

    let sess;
    try {
        sess = await mongoose.startSession();
        sess.startTransaction();
        await Order.findByIdAndUpdate(orderId, { $set: { status: newStatus } }, { session: sess });
        await sess.commitTransaction();
    } catch (error) {
        return next(
            error || 'Something went wrong while removing the order data.'
        );
    } finally {
        if (sess) {
            await sess.endSession();
        }
    }

    res.json({
        message: 'Order status updated successfully.'
    })
}

const getAllOrders = async (req, res, next) => {
    let orders;
    try {
        orders = await Order.find();
    } catch (error) {
        return next(
            error || 'Something went wrong while getting the orders data. Please try again later.'
        )
    }

    res.json({
        orders: orders.map(item => item.toObject({ getters: true }))
    })
}

const userReceivedMark = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            'Invalid inputs. Please check your inputs and try again.',
            400
        );
    }

    const orderId = req.params.oid;
    if (!orderId) {
        return next(
            new HttpError(
                'No order ID was provided. Please check your inputs and try again.',
                400
            )
        );
    }

    const { newStatus } = req.body;

    if (newStatus !== 'received') {
        return next(
            new HttpError(
                'Invalid order status. Please check your inputs and try again. It should be "received".',
                400
            )
        )
    }

    let sess;
    try {
        sess = await mongoose.startSession();
        sess.startTransaction();
        await Order.findByIdAndUpdate(orderId, { $set: { status: 'received' } }, { session: sess });
        await sess.commitTransaction();
    } catch (error) {
        return next(
            error || 'Something went wrong while marking the order data.'
        );
    } finally {
        if (sess) {
            await sess.endSession();
        }
    }

    res.json({
        message: 'Order status updated successfully.'
    })
}

exports.getMenu = getMenu;
exports.orderFood = orderFood;
exports.addNewFood = addNewFood;
exports.editFood = editFood;
exports.removeFood = removeFood;
exports.getUserOrders = getUserOrders;
exports.deliverOrder = deliverOrder;
exports.getAllOrders = getAllOrders;
exports.userReceivedMark = userReceivedMark;
