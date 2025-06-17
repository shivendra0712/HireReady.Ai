import React from 'react'

const SectionLeft = () => {
  return (
    <div className='w-full bg-[#0f0f0f] text-white px-6 py-12 md:py-20'>
        <div className="max-w-3xl mx-auto">
        <p className="text-green-400 text-sm font-semibold mb-2">Get Ready to</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ace Your Interviews with <span className="text-white">iPrep</span>
        </h2>
        <p className="text-gray-300 mb-10">
          iPrep is your go-to platform for real interview practice. It's simple, straightforward, and designed to help you improve fast.
        </p>

        <div className="space-y-6">
          {/* Feature 1 */}
          <div className="flex items-start gap-3">
           
            <div>
              <p className="font-semibold text-white">Mock interviews:</p>
              <p className="text-gray-400 text-sm">
                Dive straight into mock interviews with AI-driven interviewers that feel like the real deal. No complicated setups—just hit start and get practicing.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-3">
         
            <div>
              <p className="font-semibold text-white">Progress:</p>
              <p className="text-gray-400 text-sm">
                iPrep.Ai automatically saves your practice sessions and provides detailed feedback, allowing you to easily track your progress and identify areas for improvement.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-3">
           
            <div>
              <p className="font-semibold text-white">Level Up:</p>
              <p className="text-gray-400 text-sm">
                Ready to boost your confidence and get interview-ready? Get started with iPrep today and take the next step in your career journey!
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default SectionLeft