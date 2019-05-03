import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import config from "./config/config";
import queryString from "query-string";
import { ToastContainer, Toaster } from 'ic-react-toast';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("userEmail")
    }
  }
  componentWillMount() {
    var loggedin = localStorage.getItem("userId");
    var query = queryString.parse(this.props.location.search);

    if (loggedin != null) {
      if (query.type && query.name && query.token) {

        if (query.type == 1) {
          localStorage.setItem(query.name, query.token);
        } else {
          localStorage.setItem(query.name, query.token);
        }


      }
      this.props.history.push('/')
      console.log("pushed")
    } else {
      if (query.email) {
        localStorage.setItem(query.name, query.token);
        localStorage.setItem("userEmail", query.email);
        this.setState({ email: query.email })


      }
      else {
        this.props.history.push("/login");
      }


    }
    this.getSocialLinked();

    // localStorage.clear()

  }




  setAuthHeaders() {
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    return config
  }

  getSocialLinked() {
    console.log("called")
    let header = this.setAuthHeaders();
    let payLoad = {
      user_id: localStorage.getItem("userId"),
    }
    axios.post(config.apiUrl + "/api/users/socials", payLoad, header)
      .then(function (response) {
        response.data.forEach(sdata => {
          localStorage.setItem(sdata.provider, sdata.token)
        });
      });
  }


  updateEmail() {
    console.log(this.state.email)
    if (!this.state.email) {
      Toaster.error("Email field is blank!");
    }
    else {
      let header = this.setAuthHeaders();
      let payLoad = {
        user_id: localStorage.getItem("userId"),
        email: this.state.email,
      }
      axios.post(config.apiUrl + "/api/users/update", payLoad, header)
        .then(function (response) {

          console.log(response);
          localStorage.setItem("userEmail", response.data.email);
          Toaster.success("Email updated successfully!");
        });
    }

  }

  callapi() {
    axios.get(config.apiUrl + "/auth/google")
      .then(function (response) {

        console.log(response);




      });

  }

  deleteAccouunt() {
    console.log("called delete account")
    let header = this.setAuthHeaders();
    let payLoad = {
      user_id: localStorage.getItem("userId"),
    }
    axios.post(config.apiUrl + "/api/users/deleteAccount", payLoad, header)
      .then(function (response) {
        console.log(response);
        localStorage.clear();

      });
    this.props.history.push("/login");
  }


  unlinkSocial(type) {
    let header = this.setAuthHeaders();
    let payLoad = {
      user_id: localStorage.getItem("userId"),
      provider: type
    }
    axios.post(config.apiUrl + "/api/users/unlinkSocial", payLoad, header)
      .then(function (response) {
        console.log(response);

        if (response.status == 200) {
          localStorage.removeItem(type);
          Toaster.success("Social acccount is unlink successfully!");
        }

      });
  }

  logout() {
    localStorage.clear();
    this.props.history.push("/login");
  }
  render() {
    return (
      <div className="container">

        <nav>
          <div class="nav-wrapper" style={{ backgroundColor: '#55a3e6' }}>
            <a href="#!" class="brand-logo">Scapic</a>
            <ul class="right hide-on-med-and-down">
              <li><a href="#"><i class="far fa-user-circle"></i> {localStorage.getItem("userEmail")}</a></li>
              <li onClick={() => this.logout()}><a href="#"><i class="fas fa-sign-out-alt"></i> Logout  </a></li>
            </ul>
          </div>
        </nav>


        <div class="row">
          <div class="col s6 m3">
            <div class="card">
              <div class="card-image">
                <img src="http://bostoncolumn.com/wp-content/uploads/2018/10/header-facebook-bf7210f2.jpg" />
                {
                  localStorage.getItem("facebook") ?
                    (
                      <a onClick={() => this.unlinkSocial("facebook")} class="btn-floating halfway-fab waves-effect waves-light red"><i class="fas fa-unlink"></i></a>
                    )
                    :
                    (
                      <a href={"http://localhost:3006/api/oauth/facebook?type=3&user_id=" + localStorage.getItem('userId')} class="btn-floating halfway-fab waves-effect waves-light red"><i class="fas fa-link"></i></a>
                    )
                }

              </div>
              <div class="card-content">
                <p>Link You Facebook Account with Scapic.</p>
              </div>
            </div>
          </div>


          <div class="col s6 m3">
            <div class="card">
              <div class="card-image">
                <img src="https://www.dailypioneer.com/uploads/2018/story/images/big/end-of-the-road-for-google-plus-after-software-glitch-compromises-500k-accounts-2018-10-09.jpg" />
                {
                  localStorage.getItem("google") ?
                    (
                      <a onClick={() => this.unlinkSocial("google")} class="btn-floating halfway-fab waves-effect waves-light red"><i class="fas fa-unlink"></i></a>
                    ) : (
                      <a href={"http://localhost:3006/api/oauth/google?type=3&user_id=" + localStorage.getItem('userId')} class="btn-floating halfway-fab waves-effect waves-light red"><i class="fas fa-link"></i></a>

                    )
                }
              </div>
              <div class="card-content">
                <p>Link You Google Account with Scapic.</p>
              </div>
            </div>
          </div>


          <div class="col s6 m4">
            <div class="card white-black darken-1">
              <div class="card-content black-text">
                <span class="card-title">User Info</span>
                <div class="row">
                  <div class="input-field col s12">
                    <input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} id="email" type="text" class="validate" />
                    <label for="first_name">First Name</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input placeholder="" value={localStorage.getItem("userId")} disabled id="first_name" type="text" />
                    <label for="first_name">UID</label>
                  </div>
                  <a onClick={() => this.updateEmail()} class="waves-effect waves-light btn-small">Change Email</a>

                </div>
              </div>

            </div>
          </div>

          <div class="col s6 m2">
            <div class="card">

              <div class="card-content">
                <a onClick={() => this.deleteAccouunt()} class="waves-effect waves-light btn-small" style={{ backgroundColor: '#c72121' }}><i class="fa fa-trash"></i> Delete</a>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />


      </div>
    );
  }
}

export default App;
