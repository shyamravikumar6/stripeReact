// 

import React from 'react'


import errorImg from '../error.svg';



const Error = () => {
  return (
    <div  >
   
      <div className="flex " >
        <div className="mx-auto min-h-full   mt-20" >
          <h2 className='mb-1'>Page Not Found 🕵🏻‍♀️</h2>
          <p className='mb-2'>Oops! 😖 The requested URL was not found on this server.</p>
        
          <img className='bg-cover mt-10 ' src={errorImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default Error
