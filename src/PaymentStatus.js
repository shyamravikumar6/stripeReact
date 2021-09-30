import React from 'react'

import { green, red } from '@material-ui/core/colors';


function PaymentStatus({status}) {
 
    return (
      <div style={{ display: 'flex',justifyContent: 'center', alignItems: 'center',  minHeight:'100vh', position:'absolute', minWidth:'100vw'}}>
      {status.success? <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={green[500]} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
         :<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={red[500]} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>}
         <h1  style={{  color:`${status.success?green[500]:red[500]}`,marginLeft:'1rem'  }}>{status.success?'Payment done successfully':"Payment failed"} </h1>
         {/* <h1  style={{ color:`${status.success?green[500]:red[500]}`}}>{status.success?'Payment done successfully':"Payment failed"} </h1> */}
         {status.fail&&<p style={{color:'red'}} >{status.errormessage}</p>}
         
 
        </div>
    )
}

export default PaymentStatus
