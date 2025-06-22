import React, { Component } from 'react'
import CompanyLogo from './CompanyLogo'

const Section6 = () => {

  return (
    <div className='w-full flex flex-col  justify-between items-center gap-10  py-16 px-4 md:px-6'>
      <h2 className='text-lg font-medium text-center px-2'>Prepers use the platform for these company interviews</h2>
      <div className="w-full  flex justify-center gap-5 lg:gap-20 flex-wrap ">
        <CompanyLogo companyName='Google' />
          <CompanyLogo companyName='Uber' />
        <CompanyLogo companyName='Cisco' />
        <CompanyLogo companyName='Oracle' />
      <CompanyLogo companyName='TCS' />
      </div>
    </div>
  )
}

export default Section6