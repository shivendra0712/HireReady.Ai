import React from 'react'
import SectionLeft from './SectionLeft'
import SectionRight from './SectionRight'

const Section5 = () => {
  return (
     <div className='w-full flex justify-between items-center gap-10 py-20'>
       <div className="w-1/2"><SectionRight /></div>
      <div className="w-1/2"><SectionLeft /></div>
    </div>
  )
}

export default Section5