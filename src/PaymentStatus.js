import React from 'react'
import {Card,CardTitle} from 'reactstrap';
function PaymentStatus({status}) {
    return (
        <Card className={`${status.success?'bg-success':'bg-danger'}`} >
         <CardTitle > `{status.success? 'Payment Done successfully':'payemnt failed '}</CardTitle>
         <button><a href="https://stripecheckout-mu.vercel.app">Go back</a></button>
        </Card>
    )
}

export default PaymentStatus
