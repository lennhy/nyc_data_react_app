import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
// require('jquery')
// require('bootstrap')
// import styles '.././src/lib/css/bootstrap.min.css'

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

  // Render to the DOM the jsx and data from api
  render() {
    const { error, isLoaded, houses } = this.state;
    return (
            <div className="container-fluid">

              {/* // Begining of Header */}


              <div className="row">
                <nav className="col-md-2 bd-sidebar">
                  <form onSubmit={this.handleSubmit}>

                  <div className="form-group ">
                  {/* // Boro code Input */}
                    <label>
                    <select value={this.state.value} name="boro" onChange={this.handleChange} className="form-control">
                    <option defaultValue value="">Borough</option>
                    <option value="manhattan">Manhattan</option>
                    <option value="bronx">Bronx</option>
                    <option value="brooklyn">Brooklyn</option>
                    <option value="queens">Queens</option>
                    <option value="staten_island">Staten Island</option>
                    </select>
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                    <input type="text" className="form-control"
                    name="housenumber"
                    value={this.state.housenumber}
                    onChange={this.handleChange}
                    placeholder="Building Number"
                    />
                    </label>
                  </div>

                  <div className="form-group" >
                  {/* // Streetname code Input */}
                    <label>
                    <input type="text" className="form-control"
                    name="streetname"
                    value={this.state.streetname}
                    onChange={this.handleChange}
                    placeholder="Street Name"

                    />
                    </label>
                  </div>

                  <div className="form-group">
                  {/* // Zip code Input */}
                    <label>
                    <input type="text" className="form-control"
                    name="zip"
                    value={this.state.zip}
                    onChange={this.handleChange}
                    placeholder="Zip Code"
                    />
                    </label>
                  </div>

                  <input type="submit" value="Submit" onClick={this.update.bind(this)} className="btn btn-light" />
                  </form>
                {/* /Side bar/ */}
                </nav>

                <div className="col-md-10 bd-content">
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
                    {" "} {house.apartment}
                    </li>
                    ))}
                  </ul>
                </div>

              {/* // Row 10 wide */}
              </div>

            {/* // Contianer fluid */}
            </div>
    );
  }
}

export default App;
