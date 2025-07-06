import React, { memo } from 'react'

const SectionLeft =memo(() => {
  return (
    <div className='w-full  text-white px-6 md:px-12 lg:px-0 py-12 md:py-10'>
        <div className="max-w-3xl mx-auto">
        <p className="text-[#89E764]  font-medium mb-2">Get Ready to</p>
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          Ace Your Interviews with <span className="text-white">HireReady</span>
        </h2>
        <p className="text-[#BCBBC0] mb-10 text-lg/9">
          HireReady is your go-to platform for real interview practice. It's simple, straightforward, and designed to help you improve fast.
        </p>

        <div className="space-y-6">
          {/* Feature 1 */}
          <div className="flex items-start gap-3">
           <img src="/images/section4-logo1.png" alt="" />
            <div>
              <p className="text-[#BCBBC0] text-lg/8"><span className='text-white font-medium'>Mock interviews: </span>Dive straight into mock interviews with AI-driven interviewers that feel like the real deal. No complicated setups—just hit start and get practicing.</p>
              
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-3">
          <img src="/images/section4-logo2.png" alt="" />
            <div>
              <p className="text-[#BCBBC0] text-lg/8"><span className='text-white font-medium'>Progress: </span> HireReady.Ai automatically saves your practice sessions and provides detailed feedback.</p>
              
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-3">
           <img src="/images/section4-logo3.png" alt="" />
            <div>
              <p className="text-[#BCBBC0] text-lg/8"><span className='text-white font-medium'>Level Up: </span> Ready to boost your confidence and get interview-ready? Get started with HireReady today and take the next step in your career journey!</p>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
})

export default SectionLeft