import React from 'react';
import Navigation from './Navigation';
import { Input } from 'semantic-ui-react';
import baseURL from '../util/utilities'
// const baseURL = ''

class BuyStockPage extends React.Component{

    state = {
        ticker: '',
        symbol: '',
        amount: '',
        cost: '',
        balance: 0,
        error: null
    }

    onStockInputChange = (e) => {
        this.setState({ticker: e.target.value})
    }

    onPurchaseInputChange = (e) => {
        let amount = e.target.value 
        let cost = Number(amount) * Number(this.state.symbol.high)
        this.setState({amount: e.target.value, cost: cost })
    }

    onStockInputClick = (e) => {
        e.preventDefault()
        fetch(`https://api.iextrading.com/1.0/stock/${this.state.ticker}/previous`)
        .then(response => response.status == 404 ? this.setState({error: true}) : response.json()
        .then(data => this.setState({symbol: data}))
        )}

    handleSubmit = (e) => {
        e.preventDefault()
        const api_key = localStorage.getItem('api_key')
        let ticker = this.state.ticker
        let amount = Number(this.state.amount)
       
        if (Number.isInteger(amount)){
                fetch(baseURL + `/api/${api_key}/buy/${ticker}/${amount}`, {
                    method: 'post',
                    mode: "cors",
                    headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"},
                    body: JSON.stringify({amount: amount, ticker:ticker})
                }).then(response => response.json())
                .then(data => {
                    if (data.balance){
                        this.setState({balance: data.balance, error: false})
                    } else if (data.error){
                        this.setState({error: true})
                        }
                    })
        } else{
            this.setState({error:true})
        }
    }
       
    
    render(){
        let {symbol, date, open, high, low} = this.state.symbol

        const stock_result = this.state.symbol && 
            <div className="stockResult">
                {symbol}<br></br>
                Open: {open}, High: {high}, Low: {low} <br></br>
                Live as of: {date}
            </div>

        const success = this.state.error === false &&
            <div className="success">
               <p>Your Stock purchase was successful. Your balance is now ${this.state.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
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
                        <h1>Buy Stock</h1>   
                        {console.log(this.state)}
                        <div className="depositFormInput">
                            <div class="ui action input">
                                <input type="text" placeholder="Lookup Stock" onChange={this.onStockInputChange}/>
                                <button class="ui button" onClick={this.onStockInputClick}>Search</button>   
                            </div>
                            <br></br><br></br>

                            {stock_result}

                            <br></br>
                            <div class="ui input">
                                <input type="text" placeholder="Enter purchase amount" onChange={this.onPurchaseInputChange} />
                            </div>
                            <br></br><br></br>

                            <div>
                               { this.state.amount && <p>Confirm purchase of {this.state.amount} shares of {symbol} for ${this.state.amount && Number((this.state.amount * open).toFixed(2))} </p>} 
                            </div>

                            <div className="button">
                                <button>Submit</button>
                            </div>
                        </div>     
                        
                    </form>
                    {this.state.error ? failure : success}
                    {this.state.error !== null && setTimeout(function(){window.location.reload()}, 2500)}
                </div>                
            </div>
        )
    }
}

export default BuyStockPage;
