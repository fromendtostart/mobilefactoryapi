const express = require('express');
const createOrder = require("../controllers/orders.js");

const ordersRouter = express.Router()

ordersRouter.post("/", createOrder);

module.exports = ordersRouter;
