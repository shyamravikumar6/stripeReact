import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import PaymentDiv from './PaymentStatus';
import {style} from './materialclasses';
import {
  
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
  
  
  Radio,
  InputAdornment,
  InputLabel,
  Card
} from "@material-ui/core";

import { DateRangeRounded, ErrorRounded, PersonRounded} from '@material-ui/icons'


// import './styles.css'


import defaultImage from './user_image.png';
import StripeInput from "./StripeInput";
import { convertFormat, createPaymentIntent, getBase64FromUrl } from "./constant/function";
import { deepPurple, purple } from "@material-ui/core/colors";
import axios from "axios";
import { SERVER_URL } from "./config";
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

const ErrorMessage = ({ error }) => {
  console.log(error);
  return (
  <div  role="alert">
  
    <Typography variant='p' color='error' >*{error}</Typography>
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

const CheckoutForm = ({payload,setPaymentStatus}) => {
  const stripe = useStripe();
  
  const classes = style();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  // const [frame,setIframe]=useState(false);
  // const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(()=>{
   
    window.addEventListener('message', function(ev) {
      if (ev.data === '3DS-authentication-complete') {
        // setIframe(false);
      }
    }, false);
  })
  const [billingDetails, setBillingDetails] = useState({
   cardtype:'debit',
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
      let {amount,currency,unique_link_key}=payload;
      amount=parseInt(amount);
      const data = await createPaymentIntent({
        amount,
        currency,
    
      });
      const {client_secret} = data;
      
      console.log(data);
      delete billingDetails['cardtype'];
      const result = await stripe.confirmCardPayment(client_secret, {
        
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: billingDetails,
        },
      });
      //  await axios.post(`${SERVER_URL}/stripe/notification`,{...result,unique_link_key});

      if (result.error) {
        //  window.location.href=`admin.zotto.io/stripe/success?unique_link_key=${unique_link_key}`
        // Show error to your customer (e.g., insufficient funds)
        // setError(result.error.message);
         setPaymentStatus({ fail: true, errormessage: result.error.message });
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          // window.location.href=`admin.zotto.io/stripe/failed?unique_link_key=${unique_link_key}`
           setPaymentStatus({ success: true });
        }
        else if(result.paymentIntent.status === 'requires_payment_method'){

        }
      }
      setProcessing(false);
    } catch (e) {
      setError(e.error);
      console.log(e);
     
      setProcessing(false);
    }
  };


  return (
    <form className={classes.form} onSubmit={handleSubmit}>
     
      <Grid container item xs={12}  >
      
   

      <Grid item xs={12} sm={12}>
                <Typography variant="h4" color="primary">  Payment </Typography>
            </Grid>

            <Grid  container row spacing={3} justify="space-between" style={{margin:'1rem 0'}} >
            <Grid item xs={12} sm={12}>  
           <InputLabel style={{marginTop:'2rem'}} color="primary"> Card Type</InputLabel>
                </Grid>
        <Grid item xs={4} sm={5} justify="center" className={classes.radioField}  style={{ display:'flex', flexDirection:'column', justifyContent: 'center',border: `1px solid ${billingDetails.cardtype== "credit"? ` ${deepPurple[500]}`:'#b8c2cc'}`}}>   
        <Radio
          onChange={e=>setBillingDetails({...billingDetails,cardtype: 'credit'})}
          checked={billingDetails.cardtype  === 'credit'}
          value="credit"
          name="radio-button-demo"
          aria-label="A"
          
        />
        <label style={{margin:'auto'}}>Credit</label>
        </Grid>
        <Grid  className={classes.radioField} item xs={5} sm={5 }  style={{ display:'flex', flexDirection:'column' , justifyContent: 'center',border: `1px solid ${billingDetails.cardtype== "debit"? ` ${deepPurple[500]}`:'#b8c2cc'}`}}>  
        <Radio
          checked={billingDetails.cardtype  === 'debit'}
          onChange={e=>setBillingDetails({...billingDetails,cardtype: 'debit'})}
          value="debit"
          name="radio-button-demo"
          aria-label="B"
        />
                <label style={{margin:'auto'}}>Debit</label>
         </Grid>
         </Grid>
 
     <TextField
     className={classes.textfield}
     style={{margin:"2rem 0" ,borderBlockColor:purple}}
                label=" Card Number"
                name="ccnumber"
                variant="outlined"
                required
                
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardNumberElement,
                        options:{showIcon: true,
                          placeholder:'',
                        margin:0,
                        padding:0
                        }
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <PersonRounded style={{marginRight:'1rem'}}/>
                    </InputAdornment>
                  ),
                }}
                value={billingDetails.name}
                onChange={e =>  setBillingDetails({ ...billingDetails, name: e.target.value })
                }
            />
             </Grid>
            <Grid item container xs={12} justify="space-between" style={{margin:"2rem 0"}}>
        <Grid item xs={5} sm={4}>
      <TextField
               className={classes.smalltextfield}
                label="Expiry Date"
                name="ccexp"
                variant="outlined"
                disabled={error}
                required
                fullWidth
                onChange={e=>setError(e.error)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <DateRangeRounded style={{marginRight:'1rem'}}  />
                    </InputAdornment>
                  ),
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardExpiryElement,
                       
                       
                    },
                }}
            />
            </Grid>
          <Grid item xs={5} sm={4}>
            <TextField
                   className={classes.smalltextfield}
                
                name="cvc"
                variant="outlined"
                required
                label='CVV'
                disabled={error}
                fullWidth
                onChange={e=>setError(e.error)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='end'  >
                      <ErrorRounded style={{marginRight:'1rem'}} />
                    </InputAdornment>
                  ),
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardCvcElement,
           
                    },
                }}
            />
      </Grid>
      </Grid>
      

      
      {/* <SubmitButton error={error} disabled={!stripe || processing}>
       {processing?'Processing....':'Pay'}
      </SubmitButton> */}
      {error&&<ErrorMessage  error={error.message} />}
      <Grid xs={12} sm={12} justify="flex-end" >
      <Button variant="contained"
  color="primary"
  style={{float:'right'}}
  type="submit"
  disabled={!stripe||processing}
>
 
{
  processing
  ?
  <CircularProgress size={24} /> :`Purchase ${convertFormat(payload.currency,payload.amount)} `
  
}
</Button>
</Grid>
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

const ElementStripe = (props) => {

  const [paymentStatus,setPaymentStatus]=useState({})
  const [loading,setLoading]=useState(true);
  const [payload,setPayload]=useState({});
  const[imageSrc,setImageSrc]=useState(defaultImage);
useEffect(()=>{
const {id} =  props.match.params;
  axios.get(`${SERVER_URL}/api/payment-details/${id}`).then( async(res)=>{
          if(res.status==200){
            const {transaction:{amount,merchant_id,unique_link_key,currency,id}} = res.data.data;
            
            setPayload({amount,merchant_id,unique_link_key,currency,id});
           const data =  await getBase64FromUrl(`${SERVER_URL}/images/merchant/${merchant_id}`)
           setImageSrc(data?data:defaultImage);

          } 
        setLoading(false);      
  }).catch(err=> setLoading(false));
  


})



  if(Object.keys(paymentStatus).length) return <PaymentDiv status={paymentStatus} />
  if(loading) return  <div style={{display:'flex', flexDirection:'column', height:'100vh', justifyContent: 'center', alignItems : 'center'}}> <CircularProgress size={70} style={{margin:'auto'}}  />
 
  </div>;
  if (!Object.keys(payload).length)return( <div style={{display:'flex',flexDirection:'column', alignItems : 'center',justifyContent:'center',height:"100vh"}} > 
      
  <Typography style={{margin:'auto'}}variant='h2' color="error" > 
  <svg width="50" height="50" style={{marginRight:'1rem'}} viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#FF0000"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
  Invalid Payment Link</Typography></div>);

  return (
    <div className="container">
      <div className="mobilediv">
        <div>
        <img  src={imageSrc}  alt='hello' className="imageDiv" />
          </div>
          <div >
          <p className='amount-text'>Payment Ref</p>
          <h4 className='amount'>{payload.id}</h4>
          <p className='amount-text' style={{marginTop:'1rem'}}>Amount</p>
          <h4 className='amount'>{convertFormat(payload.currency,payload.amount)}</h4>
          </div>
      </div>
      <Card style={{width:'360px', overflow:"hidden",  minHeight:'100vh'}} className='mobilehide'>
        <div className="sidebardiv">
          <img  src={imageSrc}  alt='hello' className="imageDiv" />
          <p className='amount-text'>Payment Ref</p>
          <h4 className='amount'>{payload.id}</h4>
          <p className='amount-text'>Amount</p>
          <h4 className='amount'>{convertFormat(payload.currency,payload.amount)}</h4>
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
      </Card>

      {/* <div >
    <img alt="" width="150"
    src="https://api.zotto.z-payments.com/images/zotto_logo.png"
  
    style={{display: "block",border:0,lineHeight:'100%'}}
    />
    </div> */}
      <div className  className="card-element" >
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
          <CheckoutForm  payload={payload}  setPaymentStatus={setPaymentStatus} />
        </Elements>
      </div>
    </div>
  );
};

export default ElementStripe;

