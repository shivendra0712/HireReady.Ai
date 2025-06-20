const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    razorpayOrderId: { type: String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    totalPrice: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending",
    },
    paymentDetails: {
        payment_id: { type: String },
        order_id: { type: String },
        signature: { type: String },
    },
},
    {
        timestamps: true,
    }
)

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;

