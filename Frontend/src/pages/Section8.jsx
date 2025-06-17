import React from 'react'
import PricingCard from './PricingCard'

const Section8 = () => {

    return (
        <div className='w-full flex flex-col justify-between items-center gap-3 py-20'>
            <h2>Our Pricing</h2>
            <h1 className='text-4xl font-medium'>Flexible Pricing Plans for Everyone</h1>
            <h2 className='text-lg'>Discover our flexible pricing plans designed to meet the needs of students, job seekers, and professionals.</h2>
            <div className="flex flex-wrap gap-10 py-18">
                <PricingCard />
                <PricingCard />
                <PricingCard />
            </div>
        </div>
    )
}

export default Section8