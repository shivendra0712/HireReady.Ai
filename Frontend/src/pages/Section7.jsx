import React, { useState } from 'react'
import TestimonialCard from './TestimonialCard'

const Section7 = () => {

    const [users, setUsers] = useState([
        {
            name: "Shivendra Patel",
            jobTitle: "MERN Stack Developer",
            imgUrl: "https://example.com/user1.jpg",
            review: "HireReady.ai played a crucial role in my interview preparation. The realistic simulations and personalized feedback were invaluable. Thank you!"
        },
        {
            name: "Anjali Sharma",
            jobTitle: "Frontend Engineer",
            imgUrl: "https://example.com/user2.jpg",
            review: "Using HireReady.ai was a game-changer for me. It helped me boost my confidence and improve my interview skills. Highly recommended!"
        },
        {
            name: "Kavita Joshi",
            jobTitle: "React Native Developer",
            imgUrl: "https://example.com/user6.jpg",
            review: "HireReady.ai is a must-have tool for anyone preparing for interviews. The comprehensive preparation resources were invaluable in my success."
        },
            {
            name: "Pooja Desai",
            jobTitle: "Full Stack Developer",
            imgUrl: "https://example.com/user4.jpg",
            review: "HireReady.ai is the secret weapon every job seeker needs. The combination of industry-specific questions and real-time performance analysis gave me insights I couldn't have gained elsewhere. It's not just practice; it's strategic preparation."
        },
          {
            name: "Sarthak Mehra",
            jobTitle: "DevOps Engineer",
            imgUrl: "https://example.com/user5.jpg",
            review: "HireReady.ai transformed my interview preparation experience. The AI-powered mock interviews and detailed feedback helped me identify my weaknesses and improve significantly."
        },
       
        {
            name: "Rohit Verma",
            jobTitle: "Backend Developer",
            imgUrl: "https://example.com/user3.jpg",
            review: "HireReady.ai helped me boost my interview skills and confidence. The AI-driven mock interviews were incredibly realistic, and the instant feedback helped me refine my responses. Thanks to HireReady.ai, I walked into my interviews with confidence and landed my dream job!"
        },
     
      
        
    ]);

    return (
        <div className='w-full flex flex-col justify-between items-center gap-3 py-16 px-4 md:px-6 lg:px-1 '>
            <h2 className="text-[#89E764]  font-medium ">Testimonials</h2>
            <h1 className='text-4xl lg:text-5xl font-medium px-4 lg:px-0 text-center'>What people are saying about us</h1>
            <h2 className='w-full lg:w-[50%] text-lg text-center px-2 lg:px-0 text-white/80'>Discover what our satisfied prepers have to say about their experiences with our services.</h2>
            <div className="flex justify-center flex-wrap gap-8 py-18">
                {users.map((user, idx) => (
                    <TestimonialCard
                        key={idx}
                        name={user.name}
                        jobTitle={user.jobTitle}
                        imgUrl={user.imgUrl}
                        review={user.review}
                    />
                ))}
               
            </div>
        </div>
    )
}

export default Section7