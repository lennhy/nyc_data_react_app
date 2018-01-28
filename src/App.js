import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
require('dotenv').config()



let boro = "";
let housenumber = "";
let streetname = "";
let startDate = "";
let endDate = ""
let zip = "";
var url;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      houses: []
    };
  }
   componentDidMount() {
    if(boro && housenumber && streetname && zip && startDate && endDate){
      url = `https://data.cityofnewyork.us/resource/b2iz-pps8.json?boro=${boro}&housenumber=${housenumber}&streetname=${streetname}&zip=${zip}&$where=novissueddate between "${startDate}" and "${endDate}"`;
    }
    else{
      url = "https://data.cityofnewyork.us/resource/b2iz-pps8.json?"
    }
    axios.get(url, {
      params: {
        "$limit" : 10,
        "$$app_token" : process.env.NYC_DATA_APP_TOKEN
      }
    })
    .then(
      (result) => {
        console.log(result.data)
              this.setState({
                isLoaded: true,
                houses: result.data
              });
            },
            (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
  )}
  render() {
    const { error, isLoaded, houses } = this.state;
    return (
      <div className="App" >
        <header className="App-header">NYC Housing Violations
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
        <ul>
        {houses.map((item, index )=> (
          <li key={index}>
          {item.lot}
          </li>
        ))}
      </ul>
      </div>
    );
  }
}

export default App;


// $where=UPPER(field_name) = 'FOO'
