import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
require('dotenv').config()



let boro = "";
let housenumber = "";
let streetname = "";
// let startDate = "";
// let endDate = ""
let zip = "";
var url;


// Begining of form
// <div className="Form-1" >
//   <form onSubmit={this.handleSubmit}>
//    <label>
//      Name:
//      <input type="text" value={this.state.value} onChange={this.handleChange} />
//    </label>
//    <input type="submit" value="Submit" />
//  </form>
// </div>

// --------------------------- Form for select input
class CityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// --------------------------- Form for all regular text inputs
class InputForm extends Component {
  constructor(props) {
     super(props);
     this.state = {
       boro: "",
       housenumber: "",
       streetname: "",
       zip: "",
     };

     this.handleInputChange = this.handleInputChange.bind(this);
   }

   handleInputChange(event) {
     const target = event.target;
     // const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     this.setState({
       [name]: value
     });
   }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


// --------------------------- Output to display in the DOM
class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      houses: []
    };
  }
 componentDidMount() {
  if(boro && housenumber && streetname && zip){
    url = `https://data.cityofnewyork.us/resource/b2iz-pps8.json?boro=${boro}&housenumber=${housenumber}&streetname=${streetname}&zip=${zip}`;
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
      <div className="Data" >

        // Begining of Header
        <header className="Data-header">NYC Housing Violations
          <img src={logo} className="Data-logo" alt="logo" />
          <h1 className="Data-title">Welcome to React</h1>
        </header>
        <p className="Data-intro">
        </p>

       // List of elements from data returned from API
        <ul>
          {houses.map((house, index )=> (
            <li key={index}>
              {house.lot}
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export {CityForm, InputForm, Data};


// $where=UPPER(field_name) = 'FOO'
