import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
require('dotenv').config()

// ---------- Start of component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boro: '',
      housenumber: '',
      streetname: '',
      zip: '',
      houses: []
    };
    // --------- Bind the data to the state on every keydown
    console.log(this)
    this.handleChange = this.handleChange.bind(this);
    // --------- Bind the data to the state when form is submitted
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // ----------- Handle input from form
  handleChange(event) {
    console.log(event.target.value)
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value.toUpperCase()
    });

  }

  // ----------- Handle submission of form
  handleSubmit(event) {
    event.preventDefault();
    alert('Your favorite flavor is: ' + this.state.boro + this.state.housenumber + " , " + this.state.streetname + " , " + this.state.zip);
  }

  // ---------- Run the Socrata API
  runApi() {
    console.log(this.state);
    var url;
    if (this.state.boro && this.state.housenumber && this.state.streetname && this.state.zip) {
      url = `https://data.cityofnewyork.us/resource/b2iz-pps8.json?boro=${this.state.boro}&housenumber=${this.state.housenumber}&streetname=${this.state.streetname}&zip=${this.state.zip}`;
    } else {
      url = "https://data.cityofnewyork.us/resource/b2iz-pps8.json?"
    }
    axios.get(url, {
        params: {
          "$limit": 10,
          "$$app_token": process.env.NYC_DATA_APP_TOKEN
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
  //  Return data to DOM
  componentDidMount() {
    this.runApi()
  }

  // Update the DOM with data from API after form submit values that change the parameters in the API url
  update() {
    this.runApi()
  }

  // console.log(this.state.houses)
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

      <form onSubmit={this.handleSubmit}>

      <label>
        Choose a Borough:
        <select value={this.state.value} name="boro" onChange={this.handleChange}>
            <option value="manhattan">Manhattan</option>
            <option value="bronx">Bronx</option>
            <option value="brooklyn">Brooklyn</option>
            <option value="queens">Queens</option>
            <option value="staten_island">Staten Island</option>
          </select>
      </label>

      {/* // Form for boros
      <label>
        Borough:
        <input type="text"
          name="boro"
          value={this.state.boro}
          onChange={this.handleChange}
        />
      </label>
      */}

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

        <input type="submit" value="Submit" onClick={this.update.bind(this)} />
      </form>

       {/* // List of elements from data returned from API */}
        <ul>
          {houses.map((house, index )=> (
            <li key={index}>
              Address: {house.housenumber} {" "}
              {house.streetname}
              {house.apartment}, {" "}
              {house.boro},
              {house.zip} {" "}
              {"("}{house.nta} {" area "}{")"}
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default App;
