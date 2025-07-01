import React from 'react'
import Section5Right from './Section5Right'
import Section5Left from './Section5Left'
// const ProfileDetails = lazy(()=> import()) 

const Section5 = () => {
  return (
     <div className='w-full flex flex-col-reverse lg:flex-row justify-between items-center gap-10 lg:gap-20 py-14'>
       <div className="w-full lg:w-1/2"><Section5Right /></div>
      <div className="w-full lg:w-1/2"><Section5Left /></div>
    </div>
  )
}

export default Section5