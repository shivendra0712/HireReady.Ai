import React, { memo } from 'react'

const CompanyLogo = memo((props) => {
  
  return (
    <div className='p-4'>
    <h1 className='text-4xl font-medium'>{props.companyName}</h1>
    </div>
  )
})

export default CompanyLogo