import React from 'react'
import CartSection3 from './CartSection3'

const Section3 = () => {

  return (
    <div className='h-full w-full  flex justify-center items-center  px-40 py-20'>
      <div className="w-full flex justify-between ">
        <CartSection3 heading="10+ prepers" text="Attend interviews" />
        <CartSection3 heading="80%" text="Successfully cracked interviews" />
        <CartSection3 heading="10" text="Interviews created" />
      </div>
    </div>
  )
}

export default Section3