import React from 'react'

const Section5Left = () => {
  return (
    <div className='w-full  text-white px-6 md:px-12 lg:px-0 py-12 md:py-10'>
        <div className="max-w-3xl mx-auto">
        <p className="text-[#89E764]  font-medium mb-2">The feedback you deserve</p>
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
         Personalized Feedback 
        </h2>
        <p className="text-[#BCBBC0] mb-10 text-lg/9">
         HireReady's personalized feedback takes your interview practice to the next level. After each session, you'll receive detailed feedback.
        </p>

        <div className="space-y-6">
          {/* Feature 1 */}
          <div className="flex items-start gap-3">
           <img src="/images/section4-logo4.png" alt="" />
            <div>
              <p className="text-[#BCBBC0] text-lg/8"><span className='text-white font-medium'>Instant Feedback: </span>Once the interview wraps up, HireReady.Ai provides detailed feedback on your answers. You'll see what went well and where you can sharpen your skills, making it easy to learn and grow from each session.</p>
              
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-3">
          <img src="/images/section4-logo2.png" alt="" />
            <div>
              <p className="text-[#BCBBC0] text-lg/8"><span className='text-white font-medium'>Actionable Steps to Grow: </span> HireReady doesn't just tell you what went wrong it guides you on how to fix it.You'll know exactly what to work on to see real improvement in your next session.</p>
              
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Section5Left