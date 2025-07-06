import React, { memo } from 'react'

const CartSection3 = memo((props) => {
    return (
        <div className='flex flex-col justify-center items-center gap-2 p-4'>
            <h1 className='text-4xl mb-2 font-medium'>{props.heading}</h1>
            <p className='text-[#BCBBC0] text-lg'>{props.text}</p>
        </div>
    )
})


export default CartSection3