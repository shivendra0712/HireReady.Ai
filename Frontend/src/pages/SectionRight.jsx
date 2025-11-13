import React, { memo } from 'react'

const SectionRight = memo(() => {
    return (
        <div>
            <div className="w-full h-full  px-4 md:px-6 lg:px-0 lg:scale-110">
                <video autoPlay loop muted controls className='w-full' src="/images/interview1.mp4">
                </video>
            </div>
        </div>
    )
})

export default SectionRight

