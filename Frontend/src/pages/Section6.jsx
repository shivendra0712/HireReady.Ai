import React, { Component } from 'react'
import CompanyLogo from './CompanyLogo'

const Section6 = () => {

  return (
    <div className='w-full flex flex-col justify-center items-center gap-10 py-20 px-10 '>
      <h2 text-lg>Prepers use the platform for these company interviews</h2>
      <div className="w-full  flex justify-between">
        <CompanyLogo  />
        <CompanyLogo />
        <CompanyLogo />
        <CompanyLogo />
        <CompanyLogo />
      </div>
    </div>
  )
}

export default Section6