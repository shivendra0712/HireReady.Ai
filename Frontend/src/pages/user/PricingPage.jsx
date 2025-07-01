import React, { lazy } from 'react';
// import Section8 from '.././Section8'; // ✅ path sahi rakhna
const Section8 = lazy(()=> import('.././Section8')) 

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <Section8 />
    </div>
  );
};

export default PricingPage;