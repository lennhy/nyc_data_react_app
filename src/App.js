import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
require('dotenv').config()



// let boro;
// let housenumber;
// let streetname;
// // let startDate = "";
// // let endDate = ""
// let zip;
// var url;

// --------------------------- Output to display in the DOM
class App extends Component {
  constructor(props) {
     super(props);
     this.state = {
       // name: [
       //   "Manhattan",
       //   "Queens",
       //   "Brooklyn",
       //   "Bronx",
       //   "Staten Island"
       // ],
       boro: '',
       housenumber: '',
       streetname: '',
       zip: '',
       houses: []
     };
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);

  }

   // Handle input from form
   handleChange(event) {
     const target = event.target;
     const name = target.name;
     this.setState({
       [name]: target.value
     });
   }

   handleSubmit(event) {
     event.preventDefault();
      alert('Your favorite flavor is: ' + this.state.housenumber + "," + this.state.streetname + "," + this.state.zip);
   }

  //  Rweturn data to DOM
 componentDidMount() {
  var url;
  // if( this.state.housenumber && this.state.streetname && this.state.zip){
  //   url = `https://data.cityofnewyork.us/resource/b2iz-pps8.json?housenumber=${this.state.housenumber}&streetname=${this.state.streetname}&zip=${this.state.zip}`;
  // }
  // else{
    url = "https://data.cityofnewyork.us/resource/b2iz-pps8.json?"
  // }
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

  componentDidUpdate(prevProps, prevState){
    console.log(prevState)
    var url;
    if (this.state.zip !== prevState.zip) {
      // var url;
      // if( this.state.housenumber && this.state.streetname && this.state.zip){
      url = `https://data.cityofnewyork.us/resource/b2iz-pps8.json?boro=${this.state.boro}&housenumber=${this.state.housenumber}&streetname=${this.state.streetname}&zip=${this.state.zip}`;
      // }
      // else{
      //   url = "https://data.cityofnewyork.us/resource/b2iz-pps8.json?"
      // }
      axios.get(url, {
        params: {
          "$limit" : 10,
          "$$app_token" : process.env.NYC_DATA_APP_TOKEN
        }
      })
      .then(
        (result) => {
          console.log(result, url)
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
      )
    }


    // console.log(this.state.houses)

  }
  render() {
    const { error, isLoaded, houses } = this.state;
    return (
      <div className="App" >

      {/* // Begining of Header */}
      <header className="App-header">NYC Housing Violations
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
      </p>

      {/* // Form for boros
        <form onSubmit={this.handleSubmit}>
          <label>
            Choose a Borough:
            <select value={this.state.value} onChange={this.handleChange}>
            <option value="Manhattan" name="Manhattan">Manhattan</option>
            <option value="Queens" name="Queens">Queens</option>
            <option value="Brooklyn" name="Brooklyn">Brooklyn</option>
            <option value="Bronx" name="Bronx">Brooklyn</option>
            <option value="Staten Island" name="Staten Island">Staten Island</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      */}

      <form onSubmit={this.handleSubmit.bind(this)}>

      <label>
        Borough:
        <input type="text"
          name="boro"
          value={this.state.boro}
          onChange={this.handleChange}
        />
      </label>

        <label>
          House:
          <input type="text"
            name="housenumber"
            value={this.state.housenumber}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Street Name:
          <input type="text"
            name="streetname"
            value={this.state.streetname}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Zip:
          <input type="text"
            name="zip"
            value={this.state.zip}
            onChange={this.handleChange}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>

       {/* // List of elements from data returned from API */}
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

export default App;


// $where=UPPER(field_name) = 'FOO'
