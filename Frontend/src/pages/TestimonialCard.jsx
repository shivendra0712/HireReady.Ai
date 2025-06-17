import React from 'react';

const TestimonialCard = () => {
  return (
    <div className="max-w-sm p-6 rounded-2xl bg-[#1e1e1e] text-white shadow-xl">
      <p className="text-lg leading-relaxed mb-6">
        “iPrep.ai played a crucial role in my interview preparation. The
        <br />
        realistic simulations and personalized feedback were invaluable.
        Thank you!”
      </p>

      <div className="flex items-center gap-4">
        <img
          src="https://i.ibb.co/WkrYVwv/harshit.jpg" // 👈 replace with actual image
          alt="Harshit Kr Mishra"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">Harshit Kr Mishra</p>
          <p className="text-sm text-gray-400">Full Stack Developer</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
