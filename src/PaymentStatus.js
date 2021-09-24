import React from 'react'
import {Card,CardTitle} from 'reactstrap';
function PaymentStatus({status}) {
    return (
        <Card className={`${status.success?'bg-green':'bg-red'}`} >
         <CardTitle > `{status.success? 'Payment Done successfully':'payemnt failed '}</CardTitle>
         <button><a href="http://localhost:3000/testing">Go back</a></button>
        </Card>
    )
}

export default PaymentStatus
