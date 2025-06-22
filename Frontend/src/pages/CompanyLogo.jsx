import React from 'react'

const CompanyLogo = (props) => {
  
  return (
    <div className='p-4'>
    <h1 className='text-4xl font-medium'>{props.companyName}</h1>
    </div>
  )
}

export default CompanyLogo