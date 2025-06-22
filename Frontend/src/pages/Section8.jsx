import React, { useState } from 'react'
import PricingCard from './PricingCard'

const Section8 = () => {
     
    const [cardDetails, setCardDetails] = useState([
        {title:'Starter',subtitle:'Ideal for beginners looking to practice with a few interviews.' , rupees:199, interviewNumber:3},
        {title:'Pro',subtitle:'Perfect for those who want to take their skills to the next level.' , rupees:299, interviewNumber:6},
        {title:'Expert',subtitle:'Designed for those aiming to master their interview skills.' , rupees:499, interviewNumber:10 }
    ])

    return (
        <div className='w-full flex flex-col justify-between items-center gap-3 py-10 px-4 md:px-6 lg:px-1 '>
            <h2 className='text-[#89E764]  font-medium '>Our Pricing</h2>
            <h1 className='text-4xl lg:text-5xl font-medium px-4 lg:px-0 text-center'>Flexible Pricing Plans for Everyone</h1>
            <h2 className='w-full lg:w-[50%] text-lg text-center px-2 lg:px-0 text-white/80'>Discover our flexible pricing plans designed to meet the needs of students, job seekers, and professionals.</h2>
            <div className="flex justify-center flex-wrap gap-10 py-18">
                {cardDetails.map((card, idx) => (
                    <PricingCard
                        key={idx}
                        title={card.title}
                        subtitle={card.subtitle}
                        rupees={card.rupees}
                        interviewNumber={card.interviewNumber}
                    />
                ))}
                {/* <PricingCard />
                <PricingCard />
                <PricingCard /> */}
            </div>
        </div>
    )
}

export default Section8