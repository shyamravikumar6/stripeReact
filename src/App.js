// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://www.stripe.com/docs/payments/integration-builder

import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { Route,  BrowserRouter as Router,Switch} from 'react-router-dom'
import CheckoutForm from './pages/CheckoutForm';
import NotFound from "./pages/NotFound";
//  import 'bootstrap/dist/css/bootstrap.min.css';
//  import './styles.css';
 import './styles/index.scss';
 import theme from './constant/theme';
 import './index.css';
import DemoPage from "./pages/DemoPage";

const RouterPage=()=>{
  return (
   <ThemeProvider theme={theme}> 
    <Router>
      <Switch>
        
      <Route default exact path='/payment-checkout/:id' component={CheckoutForm}  />
       
      <Route  component={NotFound} />
      </Switch>
    </Router>
    </ThemeProvider>
  )

}



const App = () => <RouterPage />


export default App;

