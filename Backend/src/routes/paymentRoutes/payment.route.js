const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware.js')
const paymentControllers = require('../../controllers/paymentControllers/payment.controller.js')

router.post("/process",authMiddleware,paymentControllers.processPaymentController);
router.post("/verify",authMiddleware,paymentControllers.verifyPaymentController);


module.exports = router;