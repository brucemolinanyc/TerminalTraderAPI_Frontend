import React from 'react';
import Navigation from './Navigation';
import { Divider, Grid, Segment} from 'semantic-ui-react';
import './HomePage.css'
import baseURL from '../util/utilities.js'
// const baseURL = ''

class HomePage extends React.Component{

    state = {
        positions: null,
        trades: null
    }

    componentDidMount = () => {
        const api_key = this.props.match.params.id

        fetch(baseURL + `/api/${api_key}/positions`, {
            method: 'get',
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
        }).then(response => response.json())
        .then(data => this.setState({positions: [data.positions][0]}))

        fetch( baseURL + `/api/${api_key}/alltrades`, {
            method: 'get',
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"}
        })
        .then(response => response.json())
        .then(data => this.setState({trades: [data.trades][0]}))
    }

    render(){
        const positions = this.state.positions && this.state.positions.map( (el, idx) => {
            const key = Object.keys(el)
            if(el[key].shares > 0){
                    return <div className="positions" >
                                <div className="content">
                                    <div className="header">stock: &nbsp;<strong><font color="blue">{el[key].ticker}</font></strong></div>
                                    <div className="meta">amount: &nbsp;<strong><font color="green">{el[key].shares}</font></strong></div>
                                </div>
                            </div>
            }
         })

         const trades = this.state.trades && this.state.trades.map( (el, idx) => {
            const key = Object.keys(el)
                return <div className="trades" key={idx}>
                            <div className="content">
                                <div className="header">stock: &nbsp;<strong><font color="blue">{el[key].ticker}</font></strong> 
                                <br></br>
                                price: ${el[key].price}
                                </div>
                                <div className="meta">volume: &nbsp;<strong><font color="green">{el[key].volume}</font></strong>
                                <br></br>
                                Date made: &nbsp; {el[key].time}
                                </div>
                            </div>
                        </div>
    })

        return(
            <div>
                <Navigation/>
                <Segment>
                    <Grid columns={2} textAlign='center' >
                        <Grid.Column textAlign='center'>
                            <h2>Your Positions</h2>
                            {positions}
                        </Grid.Column>

                        <Grid.Column textAlign='center'>
                            <h2>Your Trade History</h2>
                            {trades}
                        </Grid.Column>
                    </Grid>
                    <Divider vertical></Divider>
                </Segment>
            </div>
        )
    }
}

export default HomePage;