// 

import React from 'react'


import errorImg from './error.svg';
import './styles/page-misc.scss';


const Error = () => {
  return (
    <div  >
   
      <div style={{display: 'flex',justifyContent: 'center'}}>
        <div  style={{marign:'auto'}}>
          <h2 className='mb-1'>Page Not Found 🕵🏻‍♀️</h2>
          <p className='mb-2'>Oops! 😖 The requested URL was not found on this server.</p>
        
          <img className='img-fluid' src={errorImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default Error
