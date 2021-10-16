import React from 'react';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import CustomerRegistration from './components/CustomerRegistration';
import AddBenificiary from './components/AddBenificiary';
import FundTransfer from './components/FundTransfer';

const Routes = () => (
    <Router>
    	<div>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registerCustomer" component={CustomerRegistration} />
            <Route exact path="/transferFund" component={FundTransfer} />
            <Route exact path="/addpayee" component={AddPayee} />
        </div>
    </Router>
);

export default Routes;
