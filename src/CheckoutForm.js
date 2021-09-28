import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {style} from './materialclasses';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
  CardNumberElement,
     CardExpiryElement,
     CardCvcElement,
} from "@stripe/react-stripe-js";

import {
  TextField,
  Grid,
  Button,
  CircularProgress,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@material-ui/core";

// import './styles.css'

import PaymentStatus from "./PaymentStatus";
import defaultImage from './user_image.png';
import StripeInput from "./StripeInput";
const stripePromise = loadStripe(
  "pk_test_51JcMw2Dvlwn29zrnxjXHEMGdkqYljKlQ5ekd4tLyQEZPQXVFegV36ZGygcgkFqxvlm2WQX06S5g8kdWHCd7piWmz00SeYYkyqT"
);

// const cardLogo=[
//   'Maestro','Visa'
// ];

// const InvalidLink=()=>(<div className="invalid_link"><div className="card-element"><p>Invalid data</p></div> </div>)
const Svg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
// const CARD_OPTIONS = {
//   iconStyle: "solid",
//   style: {
//     base: {
//       iconColor: "#c4f0ff",
//       color: "#fff",
//       margin:0,
//       fontWeight: 500,
//       fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
//       fontSize: "16px",
//       fontSmoothing: "antialiased",
//       ":-webkit-autofill": {
//         color: "#fce883"
//       },
//       "::placeholder": {
//         color: "#87bbfd"
//       }
//     },
//     invalid: {
//       iconColor: "#ffc7ee",
//       color: "#ffc7ee"
//     }
//   }
// };
// const CardField = ({ onChange }) => (
//   <div className="FormRow">
//     <CardElement options={CARD_OPTIONS} onChange={onChange} />
//   </div>
// );

// const SubmitButton = ({ processing, error, children, disabled }) => (
//   <button
//     className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
//     type="submit"
//     disabled={processing || disabled}
//   >
//     {processing ? "Processing..." : children}
//   </button>
// );

const ErrorMessage = ({ error }) => {
  console.log(error);
  return (
  <div  role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {error}
  </div>
)  
}


// const ResetButton = ({ onClick }) => (
//   <button type="button" className="ResetButton" onClick={onClick}>
//     <svg width="32px" height="32px" viewBox="0 0 32 32">
//       <path
//         fill="#FFF"
//         d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
//       />
//     </svg>
//   </button>
// );

const CheckoutForm = ({ client }) => {
  const stripe = useStripe();
  
  const classes = style();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({});
  // const [frame,setIframe]=useState(false);
  // const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(()=>{
    console.log(stripe);
    window.addEventListener('message', function(ev) {
      if (ev.data === '3DS-authentication-complete') {
        // setIframe(false);
      }
    }, false);
  })
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }
  // console.log('343',billingDetails,elements.getElement(CardNumberElement));
    try {
      const {client_secret} = await stripe.paymentIntents.create({
        amount: 2000,
        currency: 'usd',
        payment_method_types: ['card'],
      });
      
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: billingDetails,
        },
      });
      console.log(result);
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        setError(result.error.message);
        setPaymentStatus({ fail: true, errormessage: result.error.message });
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          setPaymentStatus({ success: true });
        }
        else if(result.paymentIntent.status === 'requires_payment_method'){

        }
      }
      setProcessing(false);
    } catch (e) {
      // console.log(e, "343");
      setProcessing(false);
    }
  };

  if (Object.keys(paymentStatus).length)
    return <PaymentStatus status={paymentStatus} />;
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
     
      <Grid container item xs={12} >
      
   

      <Grid item xs={12} sm={3}>
                <Typography variant="h4" color="">Payment </Typography>
            </Grid>

      
            <RadioGroup                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ds
            row                                                                                             
          aria-label="quiz"
          name="cardtype"
          value={billingDetails.cardtype}
          onChange={e=>setBillingDetails({...billingDetails,cardtype:e.target.value})}
        >
          <FormControlLabel  variant="outlined" value="credit" control={<Radio />} label="Credit" />
          <FormControlLabel  variant="outlined" value="debit" control={<Radio />} label="Debit" />
        </RadioGroup>
         
 
     <TextField
     className={classes.textfield}
     style={{margin:"1rem 0"}}
                label="Credit Card Number"
                name="ccnumber"
                variant="outlined"
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardNumberElement
                    },

                }}

                onChange={(e)=>{setError(e.error);  setCardComplete(e.complete); }}
            />
               <Grid  item xs={12} sm={12}  >
       <TextField
       className={classes.textfield}
                label="Card Holder Name"
                name="name"
                variant="outlined"
                required
                fullWidth
                value={billingDetails.name}
                onChange={e =>  setBillingDetails({ ...billingDetails, name: e.target.value })
                }
            />
             </Grid>
            <Grid item container xs={12} justify="space-between" style={{margin:"1rem 0"}}>
        <Grid item xs={4} sm={4}>
      <TextField
               className={classes.smalltextfield}
                label="Expiration Date"
                name="ccexp"
                variant="outlined"
                disabled={error}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardExpiryElement,
                       
                    },
                }}
            />
            </Grid>
          <Grid item xs={4} sm={4}>
            <TextField
                   className={classes.smalltextfield}
                label="CVC"
                name="cvc"
                variant="outlined"
                required
                disabled={error}
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardCvcElement
                    },
                }}
            />
      </Grid>
      </Grid>
      

      
      {/* <SubmitButton error={error} disabled={!stripe || processing}>
       {processing?'Processing....':'Pay'}
      </SubmitButton> */}
      {error&&<ErrorMessage  error={error.message} />}
      <Button variant="contained"
  color="primary"
  className={classes.button}
  type="submit"
  disabled={!stripe||processing}
>
{
  processing
  ?
  <CircularProgress size={24} /> :'Pay'
  
}
</Button>
</Grid>
    </form>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

const ElementStripe = () => {
  const queryString = window.location.search;
  console.log(queryString);
  // if (
  //   !queryString ||
  //   !queryString.includes("client_secret") ||
  //   !String(queryString).split("=")[1]
  // ) {
  //        return <InvalidLink />   ;
  //         // window.location.href  ='http://localhost:3000/failed';
  // }
  
  return (
    <div className="container">
      <div className="mobilediv">
        <div>
        <img  src={defaultImage}  alt='hello' className="imageDiv" />
          </div>
          <div >
          <p className='amount-text'>Payment Ref</p>
          <h4 className='amount'>2781</h4>
          <p className='amount-text' style={{marginTop:'1rem'}}>Amount</p>
          <h4 className='amount'>$ 7.00</h4>
          </div>
      </div>
      <div className="sidebar">
        <div className="sidebardiv">
          <img  src={defaultImage}  alt='hello' className="imageDiv" />
          <p className='amount-text'>Payment Ref</p>
          <h4 className='amount'>2781</h4>
          <p className='amount-text'>Amount</p>
          <h4 className='amount'>$ 7.00</h4>
          <div className="svgDiv" />
          <div className="svgImg">
            <Svg />
          </div>
          <Grid container item xs={12} sm={9} justify="space-between" style={{marginTop:'2rem'}} >
                {/* {cardLogo.map(e => <img key={e} src={import(`./${e}.png`)} alt='hello' width="50px" align="bottom" style={{ padding: "0 5px" }} />)} */}
            </Grid>
          
            <p className='secure-text'>
              Pay the above amount using Open Banking, Safe and Secure. You will
              be navigated to your Selected Banking app to securely authenticate
              and make the payment.
            </p>
         <span className="linkstyle" >back to merchant</span>
        </div>
      </div>

      {/* <div >
    <img alt="" width="150"
    src="https://api.zotto.z-payments.com/images/zotto_logo.png"
  
    style={{display: "block",border:0,lineHeight:'100%'}}
    />
    </div> */}
      <div className="card-element">
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
          <CheckoutForm  />
        </Elements>
      </div>
    </div>
  );
};

export default ElementStripe;

