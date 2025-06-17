import React from 'react'

const CartSection3 = (props) => {
    return (
        <div className='flex flex-col justify-center items-center font-medium p-4'>
            <h1 className='text-4xl mb-2'>{props.heading}</h1>
            <p>{props.text}</p>
        </div>
    )
}

export default CartSection3