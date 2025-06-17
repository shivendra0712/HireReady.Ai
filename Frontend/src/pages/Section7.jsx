import React from 'react'
import TestimonialCard from './TestimonialCard'

const Section7 = () => {

    return (
        <div className='w-full flex flex-col justify-between items-center gap-3 py-20'>
            <h2>Testimonials</h2>
            <h1 className='text-4xl font-medium'>What people are saying about us</h1>
            <h2 className='text-lg'>Discover what our satisfied prepers have to say about their experiences with our services.</h2>
            <div className="flex flex-wrap gap-10 py-18">
            <TestimonialCard /> 
            <TestimonialCard /> 
            <TestimonialCard /> 
            <TestimonialCard /> 
            <TestimonialCard />
            <TestimonialCard /> 
          
            </div>
        </div>
    )
}

export default Section7