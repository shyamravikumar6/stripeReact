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

import { DateRangeRounded, ErrorRounded, MailRounded, PersonRounded} from '@material-ui/icons'


// import './styles.css'


import defaultImage from '../user_image.png';
import StripeInput from "./StripeInput";
import { convertFormat, createPaymentIntent, emailValidate, getBase64FromUrl } from "../constant/function";
import { deepPurple, purple } from "@material-ui/core/colors";
import axios from "axios";
import { SERVER_URL } from "../config";
const stripePromise = loadStripe(
  "pk_test_51JcMw2Dvlwn29zrnxjXHEMGdkqYljKlQ5ekd4tLyQEZPQXVFegV36ZGygcgkFqxvlm2WQX06S5g8kdWHCd7piWmz00SeYYkyqT"
);



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
 
  return (
  <div  role="alert">
  
    <p className='text-red-500 mb-2'>  *{error}</p>
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
        
    if(!cardComplete)return setError({message:"Please enter valid card details's"})

    if (!stripe || error || !elements ) {
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
        await axios.post(`${SERVER_URL}/stripe/notification`,{...result.paymentIntent,unique_link_key});

      if (result.error) {
          window.location.href=`https://paymentz.z-pay.co.uk/stripe/failed?unique_link_key=${unique_link_key}`
        //  Show error to your customer (e.g., insufficient funds)
        //  setError(result.error.message);
     
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
           window.location.href=`https://paymentz.z-pay.co.uk/stripe/success?unique_link_key=${unique_link_key}`
        
        }
        else if(result.paymentIntent.status === 'requires_payment_method'){

        }
      }
      
    } catch (e) {
      setError(e.error);
      console.log(e);
     
      setProcessing(false);
    }
  };


  return (
    <form className={classes.form} onSubmit={handleSubmit}>
     
      <Grid container item xs={12} className="ml-1"  >
      
   

      <Grid item xs={12} sm={12}>
                <Typography variant="h4" color="primary">  Payment </Typography>
            </Grid>

            <Grid  container row spacing={3} justify="space-between" style={{margin:'1rem 0'}} >
            <Grid item xs={12} sm={12}>  
           <InputLabel style={{marginTop:'1rem'}} color="primary"> Card Type</InputLabel>
                </Grid>
        <Grid item xs={4} sm={5} justify="center" className={classes.radioField}  style={{ display:'flex', flexDirection:'column', justifyContent: 'center',border: `1px solid ${billingDetails.cardtype== "credit"? ` ${deepPurple[500]}`:'#b8c2cc'}`}}>   
        <Radio
          onChange={e=>setBillingDetails({...billingDetails,cardtype: 'credit'})}
          checked={billingDetails.cardtype  === 'credit'}
          value="credit"
          name="radio-button-demo"
          aria-label="A"
          
        />
        <p   className=' font-thin text-black-500' style={{margin:'auto'}}>Credit</p>
        </Grid>
        <Grid  className={classes.radioField} item xs={5} sm={5 }  style={{ display:'flex', flexDirection:'column' , justifyContent: 'center',border: `1px solid ${billingDetails.cardtype== "debit"? ` ${deepPurple[500]}`:'#b8c2cc'}`}}>  
        <Radio
          checked={billingDetails.cardtype  === 'debit'}
          onChange={e=>setBillingDetails({...billingDetails,cardtype: 'debit'})}
          value="debit"
          name="radio-button-demo"
          aria-label="B"
        />
              <p   className=' font-thin text-black-500' style={{margin:'auto'}}>Debit</p>
         </Grid>
         </Grid>
 
     <TextField
     className={classes.textfield}
     style={{margin:"2rem 0 "   ,borderBlockColor:purple}}
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
                          
                        margin:"1rem",
                        
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
                style={{paddingLeft:'0'}}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <PersonRounded style={{marginRight:'1rem' ,marginLeft:'0'}}   className="text-gray-200"/>
                    </InputAdornment>
                  ),
                }}
                value={billingDetails.name}
                onChange={e =>  setBillingDetails({ ...billingDetails, name: e.target.value })
                }
            />
             </Grid>
             <div  className="my-10  flex flex-1" >
       <TextField
       
                label="Email"
                name="email"
                variant="outlined"
                style={{paddingLeft:'0'}}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <MailRounded  style={{marginRight:'1rem' ,marginLeft:'0'}}  className="text-gray-200" />
                    </InputAdornment>
                  ),
                }}
                type='email'
                value={billingDetails.Email}
                onChange={e =>  setBillingDetails({ ...billingDetails, email: e.target.value })
                }

                error={
                    billingDetails.email&&!emailValidate.test(String(billingDetails.email).toLowerCase())
                }
                 onError={e=> {console.log(e); setError(e.error)}}
            />
             </div>
            <Grid item container xs={12} justify="space-between" style={{marginBottom :' 2rem'}}  >
        <Grid item xs={5} sm={4}>
      <TextField
               className={classes.smalltextfield}
                label="Expiry Date"
                name="ccexp"
                variant="outlined"
                disabled={error}
                required
                fullWidth
              
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <DateRangeRounded style={{marginRight:'1rem'}}  className="text-gray-200"  />
                    </InputAdornment>
                  ),
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardExpiryElement,
                       
                       
                    },
                }}
                onChange={(e)=>{setError(e.error);  setCardComplete(e.complete); }}
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
                      <ErrorRounded style={{marginRight:'1rem'}}   className="text-gray-200" />
                    </InputAdornment>
                  ),
                    inputComponent: StripeInput,
                    inputProps: {
                        component: CardCvcElement,
           
                    },
                }}
                onChange={(e)=>{setError(e.error);  setCardComplete(e.complete); }}
            />
      </Grid>
      </Grid>
      

      
      {/* <SubmitButton error={error} disabled={!stripe || processing}>
       {processing?'Processing....':'Pay'}
      </SubmitButton> */}
      {error&&<ErrorMessage  error={error.message} />}
      <div   className='flex flex-1 justify-end mb-8'>
      <Button variant="contained"
      className='h-14'
  color="primary"

  type="submit"
  disabled={!stripe||processing}
>
 
{
  processing
  ?
  <CircularProgress size={24} /> :`Purchase ${convertFormat(payload.currency,payload.amount)} `
  
}
</Button>
</div>
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
            const {transaction:{amount,merchant_id,unique_link_key,currency,order_id,payment_status}} = res.data.data;
            if(payment_status!='COMPLETED'){
            setPayload({amount,order_id,unique_link_key,currency});
           const data =  await getBase64FromUrl(`${SERVER_URL}/images/merchant/${merchant_id}`)
           setImageSrc(data?data:defaultImage);
            }else{
              window.location.href='/'
            }
          } 
    setLoading(false);      
  }).catch(err=>{  setLoading(false); window.location.href='/'});

  

},[])



  if(Object.keys(paymentStatus).length) return <PaymentDiv status={paymentStatus} />
  if(loading) return <div style={{display:'flex', flexDirection:'column', height:'100vh', justifyContent: 'center', alignItems : 'center'}}> <CircularProgress size={70} style={{margin:'auto'}}  />
 
  </div>;


  return (
    <div className='  md:inline-flex  min-h-screen' >
      <div className="mobilediv">
        <div>
        <img  src={imageSrc}  alt='hello' className=" mx-auto h-40" />
          </div>
          <div >
          <p className='amount-text'>Payment Ref</p>
          <h4 className='amount'>{payload.order_id}</h4>
          <p className='amount-text' style={{marginTop:'1rem'}}>Amount</p>
          <h4 className='amount'>{convertFormat(payload.currency,payload.amount)}</h4>
          </div>
      </div>
      <div className='mobilehide  w-1/4 '>
        <div className="card    text-center min-h-full justify-items-center     ">
          <img  src={imageSrc}  alt='hello' className="mx-auto h-40" />
          <p className='amount-text'>Payment Ref</p>
          <h4 className='amount'>{payload.order_id}</h4>
          <p className='amount-text'>Amount</p>
          <h4 className='amount'>{convertFormat(payload.currency,payload.amount)}</h4>
          <div className="svgDiv" />
          <div className="svgImg  mx-auto">
            <Svg />
          </div>
          <div className="flex justify-center mt-10"   >
                 <img key={'visa'} src="http://www.credit-card-logos.com/images/visa_credit-card-logos/new_visa_medium.gif" alt='hello' width="50px" align="bottom" style={{ padding: "0 5px" }} />
                 <img key={'visa'} src="http://www.credit-card-logos.com/images/mastercard_credit-card-logos/mastercard_logo_4.gif" alt='hello' width="50px" align="bottom" style={{ padding: "0 5px" }} />
                 {/* <img key={'visa'} src="http://www.credit-card-logos.com/images/mastercard_credit-card-logos/mastercard_logo_4.gif" alt='hello' width="50px" align="bottom" style={{ padding: "0 5px" }} /> */}
            </div>
          
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
      <div className  className="card flex-initial md:mx-20   md:my-20  scroll-y-none   px-8 mb-20 pb-3  mx-2 " >
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
          <CheckoutForm  payload={payload}  setPaymentStatus={setPaymentStatus} />
        </Elements>
      </div>
    </div>
  );
};

export default ElementStripe;

