import React from 'react';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import DepositPage from '../components/DepositPage';
import BuyStockPage from '../components/BuyStockPage';
import SellPage from '../components/SellPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact={true}/>
                <Route path="/register" component={RegisterPage} />
                <Route path="/home/:id" component={HomePage} />
                <Route path="/deposit/:id" component={DepositPage} />
                <Route path="/buy/:id" component={BuyStockPage} />
                <Route path="/sell/:id" component={SellPage} />
            </Switch>
        </div>
    </BrowserRouter>
    
)

export default AppRouter;