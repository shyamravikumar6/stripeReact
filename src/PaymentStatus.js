import React from 'react'
import {
  Card,
  Grid,
  CardHeader,

  Button,
  CardContent
  } from "@material-ui/core";


function PaymentStatus({status}) {
 
    return (
        <Grid xs={6} sm={6} style={{margin:" 10rem auto "}} >
        <Card  >
         <CardHeader color='green' > {status.success? 'Payment Done successfully':'payemnt failed '}</CardHeader>
          <CardContent>
          <Grid item xs={12} sm={12} jusify='center'>
          <h3 >Bank</h3>
         </Grid>
         {status.fail&&<p>{status.errormessage}</p>}
         
         <Button variant="contained"
         style={{marginLeft:"1rem",textColor:"white"}}
         
  color="primary" ><a className={{fontSyle:'italic'}} href="/checkout/232">Back to merchant</a></Button>
        </CardContent>
        </Card>
        </Grid>
    )
}

export default PaymentStatus
