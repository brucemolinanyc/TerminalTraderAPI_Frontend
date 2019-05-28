import React from 'react';
import {withRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import baseURL from '../util/utilities'
// const baseURL = ''


import './Navigation.css';

class Navigation extends React.Component{
 
  state = {
    username: '',
    balance: ''
  }

  componentDidMount = () => {
    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token)

    fetch(baseURL + `/user/${decoded.user}`,{
            method: 'get',
            mode: 'cors',
            Navigations: {"Content-Type": "application/json"},
        })
        .then(response => response.json())
        .then(data => this.setState({username: data.user.toUpperCase(), balance: data.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }))
  }

  onClick = () => {
    localStorage.clear()
    this.props.history.push('/')
  }

  render(){
    return(
    <div className="ui inverted menu huge black">
        <a className="red item" href={`/home/${localStorage.getItem('api_key')}`}  exact="true">Home</a>
        <a className="red item" href={`/deposit/${localStorage.getItem('api_key')}`} exact="true">Deposit $</a>
        <a className="red item" href={`/buy/${localStorage.getItem('api_key')}`} exact="true">Buy Stock</a>
        <a className="red item" href={`/sell/${localStorage.getItem('api_key')}`} exact="true">Sell Stock</a>
        
        <div className="right menu">
            <div className="item" width={4}>
                <p>
                <strong className="strong">
                Username: {this.state.username} <br></br>
                Account: {localStorage.getItem('api_key')} <br></br>
                <font color="#00ff00">Balance: ${this.state.balance}</font>
                </strong>
                </p>
            </div>

            <div className="right menu item">
                <div className="ui icon input">
                    <input type="text" placeholder="Search..." />
                    <i
                    aria-hidden="true"
                    className="search icon"
                    ></i>
                </div>
            </div>

            <div className="right menu item">
                <div className="ui primary button" onClick={this.onClick}>
                Sign Out 
                </div>
            </div>

        </div>
    </div>
    )
  }
}

export default withRouter(Navigation);

