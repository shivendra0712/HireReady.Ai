import React, { useState } from 'react';

const Section10 = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is HireReady?',
      answer:
        'HireReady is an AI-powered platform designed to help users prepare for interviews. It provides personalized practice questions, feedback, and tips to improve your performance based on your skills and the role you\'re targeting.',
    },
    {
      question: 'Is it okay to start interview prep from scratch if I have less experience?',
      answer:
        'Absolutely! Everyone starts somewhere. We’ve curated beginner-friendly resources, practice problems, and roadmaps to help you gradually build your skills from basic to advanced.',
    },
    {
      question: 'How do I balance college academics with interview HireReady?',
      answer:
        'Effective time management and prioritization is key. Set realistic study goals and use resources that match your current schedule.',
    },
    {
      question: 'Do I need a technical background to use HireReady?',
      answer:
        'No! HireReady is designed to help both technical and non-technical individuals prepare for interviews in their respective fields.',
    },
  ];

  const toggleFAQ = (idx) => {
    setActiveIndex((prevIndex) => (prevIndex === idx ? null : idx));
  };

  return (
    <div className='w-full flex flex-col justify-between items-center gap-4 py-6 lg:py-16 px-4 md:px-6 lg:px-1'>
      <h1 className='w-full lg:w-[50%] text-xl lg:text-2xl font-medium px-4 lg:px-0 text-center'>
        Frequently asked questions
      </h1>
      <h2 className='w-full lg:w-[50%] text-lg/9 text-center px-3 lg:px-0 text-white/80 py-2'>
        Have a different question and can’t find the answer you’re looking for? Reach out to our support team by{' '}
        <span className='text-[#89E764]'>sending us an email</span> and we’ll get back to you as soon as we can.
      </h2>

      {/* FAQ Loop */}
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className={`w-full max-w-2xl rounded-md p-4 mb-1 transition-all duration-300 cursor-pointer hover:bg-white/10 hover:rounded-md ${
            activeIndex === idx ? 'bg-white/10' : ''
          }`}
          onClick={() => toggleFAQ(idx)}
        >
          <div className="flex justify-between items-center  ">
            <p className={`text-base  font-medium ${
              activeIndex === idx ? 'text-[#89E764]' : 'text-white'
            }`}>
              {faq.question}
            </p>
            <span className="text-white text-xl font-bold">
              {activeIndex === idx ? '−' : '+'}
            </span>
          </div>

          {activeIndex === idx && (
            <p className="text-sm/6 text-white/80 mt-2">{faq.answer}</p>
          )}
        </div>
      ))}

     
    </div>
  );
};

export default Section10;
