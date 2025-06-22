import React from "react";
import { processPaymentService, verifyPaymentService } from "../API/paymentService";
// import { processPaymentService, verifyPaymentService } from "../services/paymentServices";


const PricingCard = (props) => {

  const paymentHandler = async (props) => {
    const res = await processPaymentService({ amount: 500 }); // Example amount
    const { key, orderId, amount } = res.data;
    console.log(res.data);

    const options = {
      key,
      amount,
      currency: "INR",
      name: "My App",
      description: "Test Transaction",
      order_id: orderId,
      handler: async function (response) {
        const verifyRes = await verifyPaymentService({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        alert(verifyRes.data.message);
      },
      prefill: {
        name: "Shivanth",
        email: "shivanth@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  const { title, subtitle, rupees, interviewNumber } = props;


  
  return (
    rupees == 299 ? (
      <div className="bg-[#161617] text-white max-w-xs w-full p-6 rounded-2xl border-2 border-[#BEF264] shadow-lg">
        <div className="flex justify-between items-center">  
          <h3 className="text-xl font-semibold">{title}</h3>
          <h1 className="text-black/80 bg-[#BEF264] px-3 py-1 rounded-full text-sm font-medium">Recommended</h1>
          </div>
      
        <p className="text-gray-400 mt-2 mb-6">{subtitle}</p>

        <div className="text-3xl font-bold mb-4">₹ {rupees}</div>

      <button onClick={paymentHandler} className="w-full py-2 font-medium bg-[#BEF264] hover:bg-[#bef264cf]  rounded-md text-black transition">
          Buy package
        </button>

        <ul className="mt-6 space-y-3 text-white/90">
          <li className="flex items-center font-base gap-2">
            <i className="ri-check-line text-xl"></i> {interviewNumber} mock interviews
          </li>
          <li className="flex items-center font-base gap-2">
            <i className="ri-check-line text-xl"></i> ~30 minutes each interview
          </li>
          <li className="flex items-center font-base gap-2">
            <i className="ri-check-line text-xl"></i> Expert feedback
          </li>
        </ul>
      </div>
    ) : (
      <div className="bg-[#111111] text-white max-w-xs w-full p-6 rounded-2xl border-1 border-white/20 shadow-lg">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-400 mt-2 mb-6">{subtitle}</p>

        <div className="text-3xl font-bold mb-4">₹ {rupees}</div>

        <button onClick={paymentHandler} className="w-full py-2 font-medium bg-[#2d2d2d] rounded-md hover:bg-[#444] transition">
          Buy package
        </button>

        <ul className="mt-6 space-y-3 text-white/90">
          <li className="flex items-center font-base gap-2">
            <i className="ri-check-line text-xl"></i> {interviewNumber} mock interviews
          </li>
          <li className="flex items-center font-base gap-2">
            <i className="ri-check-line text-xl"></i> ~30 minutes each interview
          </li>
          <li className="flex items-center font-base gap-2">
            <i className="ri-check-line text-xl"></i> Expert feedback
          </li>
        </ul>
      </div>
    )
  )
};

export default PricingCard;




