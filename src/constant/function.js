import { STRIPE_SECRET_KEY } from "../config";
import axios from 'axios'



export const createPaymentIntent=(value)=>{
 return new  Promise((resolve,rej)=>{
    
    const data = new URLSearchParams(value);
       axios.post('https://api.stripe.com/v1/payment_intents',data,{headers:{'Authorization':`Bearer ${STRIPE_SECRET_KEY}`,'Content-Type':'application/x-www-form-urlencoded' }  })
       .then(res=>{
           console.log(res)
           if(res.status==200&&res.data){resolve({client_secret:res.data.client_secret})} 
     }).catch((err:AxiosError)=>{
         console.log(err,'bankai');
           rej(err.response?err.response.data:err.responeText);
     });
});  
    
}

export const emailValidate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export const convertFormat = (currency,someNumber) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(someNumber);
};


export const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = () => {
      const base64data = reader.result;   
      resolve(base64data);
    }
  });
}