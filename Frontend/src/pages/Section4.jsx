import React from 'react'
import SectionLeft from './SectionLeft'
import SectionRight from './SectionRight'

const Section4 = () => {
  
  return (
    <div className='w-full flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-20 py-14'>
      <div className="w-full lg:w-1/2"><SectionLeft /></div>
       <div className="w-full lg:w-1/2"><SectionRight /></div>
    </div>
  )
}

export default Section4