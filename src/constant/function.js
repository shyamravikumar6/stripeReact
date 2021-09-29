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