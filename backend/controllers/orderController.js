import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import { sendEmailTimeweb } from '../mailer/index.js'
import emailOrderHTML from '../emails/email-order/index.js'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    deliveryPrice,
    deliveryType,
    itemsPrice,
    totalPrice,
    phone,
    paymentMethod,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      deliveryPrice,
      deliveryType,
      itemsPrice,
      totalPrice,
      phone,
      paymentMethod,
    })

    const user = await User.findById(req.user._id)
    try {
      const productsListHTML = order.orderItems
        .map((el) => {
          return `<p><strong>${el.name}</strong>${el.qty}шт. X ${
            el.price
          }р  = ${el.qty * el.price}р</p>`
        })
        .join()
      console.log('productListHTML: ', productsListHTML)
      const html = emailOrderHTML({
        name: user.name,
        id: order._id,
        deliveryType: order.deliveryType,
        shippingAddress: [
          order.shippingAddress.country,
          order.shippingAddress.city,
          order.shippingAddress.address,
        ].join(', '),
        paymentMethod: order.paymentMethod,
        productsList: productsListHTML,
        itemsPrice: order.itemsPrice,
        shippingPrice: order.deliveryPrice,
        totalPrice: order.totalPrice,
      })
      const info = await sendEmailTimeweb({
        to: user.email,
        subject: 'Заказ на WHATCH-EXPERT',
        html: html,
        attachments: [
          {
            filename: 'email-order.png',
            path: path.resolve(
              __dirname,
              '../emails/email-order/images/email-order.png'
            ),
            cid: 'email-order',
          },
        ],
      })
      console.log(
        `письмо отправлено на адрес ${user.email}, id письма ${info.messageId}`
      )
    } catch (error) {
      await user.delete()
      throw error
    }

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name id email'
  )
  if (order) {
    if (order.user.id !== req.user._id.toString()) {
      throw new Error('Not your order')
    }
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get order by ID for Admin
// @route   GET /api/orders/admin/:id
// @access  Admin
const getOrderByIdForAdmin = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc    Get orders by user id
// @route   GET /api/orders/user/:id
// @access  Admin
const getOrdersByUserId = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id })
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getOrdersByUserId,
  getOrderByIdForAdmin,
}
