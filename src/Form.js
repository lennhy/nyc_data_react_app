
import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import { errorMessage } from './Notice';
// import PropTypes from 'prop-types';


require('dotenv').config()

// ---------------------- START OF COMPONENT --------------------- //
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boro: '',
      housenumber: '',
      streetname: '',
      zip: '',
      hiding:{
        class: 'cover'
      },
      loading:{
        status: 'loading',
        class:'loader'
      },
      houses: []
    };
    // --------- Bind the data to the state on every keydown
    this.handleChange = this.handleChange.bind(this);
    // --------- Bind the data to the state on every keydown
    this.handlePaste = this.handlePaste.bind(this);
    // --------- Bind the data to the state when form is submitted
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // --------------- HANDLE INPUT FROM FORM --------------------- //
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value.toUpperCase()
    });
  }

  handlePaste(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value.toUpperCase()
    });
  }

  // ------------------ HANDLE SUBMISSION OF FORM --------------------- //
  handleSubmit(event) {
    event.preventDefault();
    if(this.state.boro==="" || this.state.housenumber==="" || this.state.streetname ==="" || this.state.zip ===""){
      alert("Something is missing.");
      // url = "https://data.cityofnewyork.us/resource/b2iz-pps8.json?$order=nta ASC";
    }
  }


  formatDate(dateObj){
    for(let i=0; i < dateObj.length; i++){
        if(dateObj[i]["novissueddate"] ){
          dateObj[i]["novissueddate"] = dateObj[i]["novissueddate"].toString().substring(5, 10) + "-" + dateObj[i]["novissueddate"].toString().substring(0, 4)
        }
        if(dateObj[i]["inspectiondate"] ){
          dateObj[i]["inspectiondate"] = dateObj[i]["inspectiondate"].toString().substring(5, 10)  + "-" + dateObj[i]["inspectiondate"].toString().substring(0, 4)
        }
        if(dateObj[i]["approveddate"] ){
          dateObj[i]["approveddate"] = dateObj[i]["approveddate"].toString().substring(5, 10)  + "-" + dateObj[i]["approveddate"].toString().substring(0, 4)
        }
    }

      return dateObj;
    }


    // ---------------- RUN THE SOCRATA API -------------------//
    runApi() {
      var url;
      if (this.state.boro && this.state.housenumber && this.state.streetname && this.state.zip) {
        url = `https://data.cityofnewyork.us/resource/b2iz-pps8.json?boro=${this.state.boro}&housenumber=${this.state.housenumber}&streetname=${this.state.streetname}&zip=${this.state.zip}&$order=apartment ASC`;
        this.setState({
          hiding:{
            class: 'cover'
          },
          loading: {
            status: 'loading',
            class: 'loader'
          }
        });
      }
      else {
        url = "https://data.cityofnewyork.us/resource/b2iz-pps8.json?$order=nta ASC";
      }
      axios.get(url, {
          params: {
            "$limit" : 1000,
            "$$app_token": process.env.NYC_DATA_APP_TOKEN
          }
        })
        .then( // --------------------- RETURN PROMISE ----------------
          (result) => {
            if(result.data.length === 0 || result.data === null  ){
              errorMessage();
            }
            this.setState({
              isLoaded: true,
              houses: this.formatDate(result.data),
              hiding:{
                class: ''
              },
              loading: {
                status: '',
                class: ''
              }
            });
          },
          (error) => {
            console.log(error)
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }


    //  ----------------------- RETURN DATA TO DOM ---------------------- //
    componentDidMount() {
      this.runApi()
      // var url;
      this.setState({
        hiding:{
          class: 'cover'
        },
        loading: {
          status: 'loading',
          class: 'loader'
        }
      });
    }


    // -------------------- UPDATE THE DOM WITH DATA FROM API AFTER FORM SUBMIT VALUES THAT CHANGE THE PARAMETERS IN THE API URL ------------------- //
    update() {
      this.runApi()
      console.log(this.state.houses)
      if(this.state.houses === null){
      }
    }


    // -------------------- EXIT BUTTON TOGGLE FROM SEARCH BOX FOR MOBILE ------------------ //
    toggleFormBox(e){
      if(e.target.className === "exit"){
        document.getElementsByClassName('col-md-2 bd-sidebar')[0].style.display = "";
        document.getElementsByClassName('formButton btn btn-primary')[0].style.display = "block";

      }
      if(e.target.className === "formButton btn btn-primary"){
        document.getElementsByClassName('formButton btn btn-primary')[0].style.display = "";
      document.getElementsByClassName('col-md-2 bd-sidebar')[0].style.display = "block";
    }
  }

  // defaultProps = {
  //   poster: 'http://i.imgur.com/bJw8ndW.png',
  // };




  // --------------- RENDER TO THE DOM THE JSX AND DATA FROM api ----------------- //
  render() {
    return (

            <div className="container-fluid">
            <div className={this.state.hiding.class}></div>

              {/* // Begining of Header */}
              <nav className="navbar fixed-top navbar-custom bg-light">

                <div className="navbar-brand" href="#">
                  <span className="highLight">Flatinspector</span> </div>
                <span className="pull-right" href="#"> </span>
                <div className="message"></div>
              </nav>

              <div className="row">

              <div className="formButton btn btn-primary" onClick={this.toggleFormBox}>Click here and fill out all input fields.</div>

              {/* // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Beginning of Form Container >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

                <nav className="col-md-2 bd-sidebar">

                <div className="exit" onClick={this.toggleFormBox}>x</div>

                  <form onSubmit={this.handleSubmit}>
                  <p className="sideBar"><b>Fill out all input fields</b></p>

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
                    onPaste={this.handlePaste}
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
                    onPaste={this.handlePaste}
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
                    onPaste={this.handlePaste}
                    onChange={this.handleChange}
                    placeholder="Zip Code"
                    />
                    </label>
                  </div>

                  <input type="submit" value="Search Apartment" onClick={this.update.bind(this)} className="btn btn-primary" />
                  </form>
                {/* / <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Side bar End of Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/ */}

                <div className="jumbotron">
                <header className="header">
                  <div className="container">

                    <ul className="list-inline">
                    <li className="text-muted"><a href="http://www.polyverge.com" target="_blank"  rel="noopener noreferrer">Created by Lenn Hypolite | Website: www.Polyverge.com</a></li>
                    <li className="text-muted"><a href="https://dev.socrata.com/foundry/data.cityofnewyork.us/b2iz-pps8" target="_blank"  rel="noopener noreferrer">Powered by dev.Socrata.com | Data from NYC Open Data API </a></li>

                    <li className="text-muted" id="date"></li>
                    </ul>
                  </div>
                </header>
                </div>
                </nav>

                {/* // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Beginning of List of elements from data returned from API >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

                <div className="col-md-10 bd-content">
                <h1 className="loading-header">{this.state.loading.status}</h1>
                <div className={this.state.loading.class}></div>
                <div>
                  <h2>{this.props.boroApts}</h2>
                </div>
                  {this.state.houses.map((house, i )=> (

                    <ul key={i+=1} className="list-group">

                      <div className="row">

                        <div className="col-sm-6">
                           <h2  >{" "}{house.streetname}{", "}{house.apartment}, {" "}{house.boro},{house.zip}
                           </h2>
                           <li  className="list-group-item"><span className="bold">Issue Date of Violation</span> {":  "}{house.novissueddate}
                           </li>
                           <li  className="list-group-item"><span className="bold">Date of Inspection</span> {":  "}{house.inspectiondate}
                           </li>
                           <li  className="list-group-item"><span className="bold">Date violation was approved </span> {":  "}{house.approveddate}
                          </li>
                        </div>

                        <div className="col-sm-6">
                          <li key={i+=5+"novdescription"} className="list-group-item"><span className="bold">Violation{": "}</span> {house.novdescription}
                          </li>
                          <li key={i+=6+"novdescription"} className="list-group-item list-group-item-info"><span className="bold">Current Status</span> {":  "}{house.currentstatus}
                         </li>
                        </div>

                      </div>

                    </ul>

                  ))}
                {/* // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< End of List of elements from data returned from API >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
                </div>

              {/* // Row 10 wide */}
              </div>

              <div className="row">
                <div className="notice"></div>
              </div>
          {/* // Contianer fluid */}
          </div>
    );
  }
}
// Form.propTypes = {
//   boroApts: PropTypes.string.isRequired
// }

export default Form;
