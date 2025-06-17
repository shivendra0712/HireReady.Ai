import React from "react";


const PricingCard = () => {
  return (
    <div className="bg-[#111111] text-white max-w-sm w-full p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold">Starter</h3>
      <p className="text-gray-400 mt-2 mb-6">
        Ideal for beginners looking to practice with a few interviews.
      </p>

      <div className="text-3xl font-bold mb-4">
        ₹ 499
      </div>

      <button className="w-full py-2 bg-[#2d2d2d] rounded-md hover:bg-[#444] transition">
        Buy package
      </button>

      <ul className="mt-6 space-y-3 text-sm">
        <li className="flex items-center gap-2">
          
          3 mock interviews
        </li>
        <li className="flex items-center gap-2">
          
          ~45 minutes each interview
        </li>
        <li className="flex items-center gap-2">
          
          Expert feedback
        </li>
        <li className="flex items-center gap-2">
          
          Practical coding questions
        </li>
      </ul>
    </div>
  );
};

export default PricingCard;
