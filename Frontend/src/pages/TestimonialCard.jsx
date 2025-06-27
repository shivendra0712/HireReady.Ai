import React from 'react';

const TestimonialCard = (props) => {
const { name, jobTitle, imgUrl, review } = props;
  return (
    <div className="max-w-sm h-min md:max-w-xs p-6 rounded-xl bg-[#18181B] text-white shadow-xl border-1 border-white/10">
      <p className=" leading-relaxed mb-6 text-white/90">
        “{review}”
      </p>
 
      <div className="flex items-center gap-4">
        <img
          src={imgUrl} 
          alt="Harshit Kr Mishra"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm font-medium text-white/60">{jobTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
