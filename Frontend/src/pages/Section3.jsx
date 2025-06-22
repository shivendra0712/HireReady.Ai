import React from 'react'
import CartSection3 from './CartSection3'

const Section3 = () => {

  return (
    <div className='h-full w-full  flex justify-center items-center  py-10 lg:14 lg:px-14'>
      <div className="w-full flex flex-col lg:flex-row  justify-between ">
        <CartSection3 heading="30+ prepare" text="Attend interviews" />
        <CartSection3 heading="80%" text="Successfully cracked interviews" />
        <CartSection3 heading="7" text="Interviews created" />
      </div>
    </div>
  )
}

export default Section3