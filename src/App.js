// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://www.stripe.com/docs/payments/integration-builder

import React from "react";
import { Route,  BrowserRouter as Router,Switch} from 'react-router-dom'
import CheckoutForm from './CheckoutForm';
import NotFound from "./NotFound";
//  import 'bootstrap/dist/css/bootstrap.min.css';
//  import './styles.css';
 import './styles/index.scss';

const RouterPage=()=>{
  return (
    <Router>
      <Switch>
      <Route exact path='/' component={CheckoutForm}  />
      <Route  component={NotFound} />
      </Switch>
    </Router>
  )

}



const App = () => <RouterPage />


export default App;

