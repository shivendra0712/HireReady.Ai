const Payment = require('../../models/paymentModels/payment.model.js');
const instance = require('../../services/payment.service.js');
const CustomError = require('../../utils/customError.js');
const crypto = require("crypto");
const { paymentConfirmationTemplate } = require('../../utils/emailTemplate.js');
const { sendMail } = require('../../utils/email.js');



exports.processPaymentController = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    const payment = await Payment.create({
      razorpayOrderId: order.id,
      userId: req.user._id,
      totalPrice: amount,
      status: "Pending",
    });

    const user = await req.user;

    user.userPayments.push(payment._id)
    await user.save();

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    next(new CustomError('Payment initiation failed', 500));
  }
};


exports.verifyPaymentController = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, available } = req.body;
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    const isValid = generatedSignature === razorpay_signature;

    let paymentdata;
    if (isValid) {
      paymentdata = await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          status: "Completed",
          paymentDetails: {
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            signature: razorpay_signature,
          },
        }
      );

      const emailTemplate = paymentConfirmationTemplate(
        req.user.username,
        paymentdata.totalPrice
      );

      await sendMail(
        "shivendrapatel01250@gmail.com",
        "Payment Completed",
        emailTemplate
      );

      const user = await req.user;
      user.available += available;
      await user.save();



      return res.status(200).json({ data: true, message: "Payment verified successfully" });
    } else {
      return next(new CustomError('Invalid signature', 400));
    }
  } catch (error) {
    next(new CustomError('Payment verification failed', 500));
  }
};

