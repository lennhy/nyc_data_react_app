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
      loading: '',
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
    if(!this.state.boro || !this.state.housenumber ||  !this.state.streetname || !this.state.zip){
      alert("Something is missing from the form");
    }
  }

  // ---------- Run the Socrata API
  runApi() {
    console.log(this.state);
    var url;
    if (this.state.boro && this.state.housenumber && this.state.streetname && this.state.zip) {
      url = `https://data.cityofnewyork.us/resource/b2iz-pps8.json?boro=${this.state.boro}&housenumber=${this.state.housenumber}&streetname=${this.state.streetname}&zip=${this.state.zip}&$order=apartment ASC`;
    } else {
      url = "https://data.cityofnewyork.us/resource/b2iz-pps8.json?$order=nta ASC"
    }
    axios.get(url, {
        params: {
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

  // exit button toggle form search box for mobile
  toggleFormBox(e){
    console.log(e.target.className)
    console.log(e.target.className === "formButton")
    if(e.target.className === "exit"){
      document.getElementsByClassName('col-md-2 bd-sidebar')[0].style.display = "none";
      document.getElementsByClassName('formButton btn btn-primary')[0].style.display = "block";

    }
    if(e.target.className === "formButton btn btn-primary"){
      document.getElementsByClassName('formButton btn btn-primary')[0].style.display = "none";
      document.getElementsByClassName('col-md-2 bd-sidebar')[0].style.display = "block";
    }
  }
  handleImageLoaded() {
     this.setState({ imageStatus: "loaded" });
   }

  // Render to the DOM the jsx and data from api
  render() {
    const { error, isLoaded, houses } = this.state;
    return (
            <div className="container-fluid" onLoad={this.handleImageLoaded.bind(this)}>

              {/* // Begining of Header */}
              <nav className="navbar fixed-top navbar-custom bg-light">
                <div className="navbar-brand" href="#">City of New York Housing Violations / Beta Version</div>
              </nav>

              <div className="row">

              <div className="formButton btn btn-primary" onClick={this.toggleFormBox}>Search for a building</div>

              {/* // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Beginning of Form Container >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <nav className="col-md-2 bd-sidebar">
                <h2 className="sideBar">Search for a building</h2>

                <div className="exit" onClick={this.toggleFormBox}>x</div>

                  <form onSubmit={this.handleSubmit}>

                  {/* // Boro code Input */}
                  <div className="form-group ">

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

                  {/* // Housenumber Input */}
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

                  <input type="submit" value="Submit" onClick={this.update.bind(this)} className="btn btn-primary" />
                  </form>
                {/* / <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Side bar End of Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/ */}

                </nav>

                {/* // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Beginning of List of elements from data returned from API >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                <div className="col-md-10 bd-content">
                  {houses.map((house, index )=> (

                    <ul className="list-group">

                      <div className="row">

                        <div className="col-sm-6">
                           <h2 key={index+=1} >{" "}{house.streetname}{", "}{house.apartment}, {" "}{house.boro},{house.zip}
                           </h2>
                           <li key={index+=2} className="list-group-item"><span className="bold">Issue Date of Violation</span> {":  "}{house.novissueddate}
                           </li>
                           <li key={index+=2} className="list-group-item"><span className="bold">Date of Inspection</span> {":  "}{house.inspectiondate}
                           </li>
                           <li key={index+=4} className="list-group-item"><span className="bold">Date violation was approved </span> {":  "}{house.approveddate}
                          </li>
                        </div>

                        <div className="col-sm-6">
                          <li key={index+=4} className="list-group-item"><span className="bold">Violation{": "}</span> {house.novdescription}
                          </li>
                          <li key={index+=5} className="list-group-item list-group-item-info"><span className="bold">Current Status</span> {":  "}{house.currentstatus}
                         </li>
                        </div>

                      </div>

                    </ul>

                  ))}
                {/* // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< End of List of elements from data returned from API >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                </div>

              {/* // Row 10 wide */}
              </div>

            {/* // Contianer fluid */}
            </div>

    );
  }
}

export default App;
