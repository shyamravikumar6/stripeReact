// 

import React from 'react'
import { Button } from 'reactstrap'

import errorImg from './error.svg';
import './styles/page-misc.scss';


const Error = () => {
  return (
    <div className='misc-wrapper'>
   
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Page Not Found 🕵🏻‍♀️</h2>
          <p className='mb-2'>Oops! 😖 The requested URL was not found on this server.</p>
          <Button   color='primary' className='btn-sm-block mb-2'>
            Back to home
          </Button>
          <img className='img-fluid' src={errorImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default Error
