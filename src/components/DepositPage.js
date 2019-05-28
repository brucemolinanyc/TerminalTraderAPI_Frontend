import React from 'react';
import Navigation from './Navigation';
// import {Button, Form, Message, Icon, Container} from 'semantic-ui-react';
import './DepositPage.css'
import baseURL from '../util/utilities'
// const baseURL = ''

class DepositPage extends React.Component{
    
    state = {
            amount: '',
            balance: 0,
            error: null
            }

    handleChange = (e) =>{
        const amount = e.target.value
        this.setState(() => ({ amount: amount }));
    }
  
    handleSubmit = (e) => {
        e.preventDefault()
        const amount = this.state.amount
        const api_key = localStorage.getItem('api_key')

        fetch(baseURL + `/api/${api_key}/deposit`, {
            method: 'put',
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({amount: amount})
        })
        .then(response => response.json())
        .then(data => {
            if(data.balance){
                this.setState({balance: data.balance, amount: '', error: false})
                }
            else if (data.error){
                this.setState({error: true})
            }
            })
    }
  
    // need:
    // validation on the number that goes in 
    // a confirmation message on the Deposit
    // Write it to the database if successful - success
    // a denial message on the deposit if not valid 


    render(){
        const success = this.state.error === false &&
            <div className="success">
               <p>Your Deposit was successful. Your balance is now ${this.state.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
            </div>
        
        const failure = this.state.error === true &&
            <div className="failure">
               <p>Your entry was invalid - Please submit again</p>
            </div>

        return(
            <div>
            <Navigation/>
                <div className="depositForm">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Deposit Funds</h1>   

                        <div className="depositFormInput">
                            <input className="A" placeholder="Enter Dollar Amount $" value={this.state.amount} onChange={this.handleChange} />
                        </div>     
                        <div className="button">
                            <button>Submit</button>
                        </div>
                    </form>
                    {this.state.error ? failure : success}
                    {this.state.error !== null && setTimeout(function(){window.location.reload()}, 2500)}
                </div>                
            </div>
        )
    }
}


export default DepositPage;
