import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Card, CardBody, FormGroup } from "reactstrap";
// import './styles.css'
import Field from "./Field";
import PaymentStatus from "./PaymentStatus";
import defaultImage from './user_image.png';
const stripePromise = loadStripe(
  "pk_test_51JcMw2Dvlwn29zrnxjXHEMGdkqYljKlQ5ekd4tLyQEZPQXVFegV36ZGygcgkFqxvlm2WQX06S5g8kdWHCd7piWmz00SeYYkyqT"
);

const InvalidLink=()=>(<div className="invalid_link"><div className="card-element"><p>Invalid data</p></div> </div>)
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
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      margin:0,
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883"
      },
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};
const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
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
    {children}
  </div>
);

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
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({});
  const [frame,setIframe]=useState(false);
  // const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(()=>{
    window.addEventListener('message', function(ev) {
      if (ev.data === '3DS-authentication-complete') {
        setIframe(false);
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

    try {
      const {client_secret}= await stripe.payment
      const result = await stripe.confirmCardPayment(client, {
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
    <form className="Form" onSubmit={handleSubmit}>
      <Field
        label="Name"
        id="name"
        type="text"
        placeholder="Jane Doe"
        required
        className="FormGroup FormRow"
        autoComplete="name"
        value={billingDetails.name}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, name: e.target.value });
        }}
      />
      <Field
        label="Email"
        id="email"
        type="email"
        placeholder="janedoe@gmail.com"
        required
        className="FormGroup FormRow"
        autoComplete="email"
        value={billingDetails.email}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, email: e.target.value });
        }}
      />
      <Field
        label="Phone"
        id="phone"
        type="tel"
        className=" FormGroup FormRow"
        placeholder="(941) 555-0123"
        required
        autoComplete="tel"
        value={billingDetails.phone}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, phone: e.target.value });
        }}
      />

      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>

      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton error={error} disabled={!stripe || processing}>
       {processing?'Processing....':'Pay'}
      </SubmitButton>
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
  if (
    !queryString ||
    !queryString.includes("client_secret") ||
    !String(queryString).split("=")[1]
  ) {
         return <InvalidLink />   ;
          // window.location.href  ='http://localhost:3000/failed';
  }
  const client_secret = String(queryString).split("=")[1];
  return (
    <div className="container">
      <div className="mobilediv">
        <div>
        <img  src={defaultImage} className="imageDiv" />
          </div>
          <div >
          <h4>Amount</h4>
          <span>$7.0</span>
          </div>
      </div>
      <div className="sidebar">
        <div className="sidebardiv">
          <img  src={defaultImage} className="imageDiv" />
          <h2 className='amount-text'>Amount</h2>
          <h3 className='amount'>$7.0</h3>
          <div className="svgDiv" />
          <div className="svgImg">
            <Svg />
          </div>
        
          
            <p>
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
          <CheckoutForm client={client_secret} />
        </Elements>
      </div>
    </div>
  );
};

export default ElementStripe;
