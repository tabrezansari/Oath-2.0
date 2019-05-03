import React, { Component } from 'react';
import config from "../../config/config";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { ToastContainer, Toaster } from 'ic-react-toast';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,

    }
  }

  setAuthHeaders() {
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    return config
  }


  handleLogin() {
    let header = this.setAuthHeaders();
    let payLoad = {
      email: this.state.email,
      password: this.state.password,
    }

    axios.post(config.apiUrl + "/api/users/login", payLoad, header)
      .then(function (response) {

        console.log(response);
        console.log(response.data)
        if (response.data.status == false) {
         Toaster.error("wrong credentials!")
        }
        else{
          localStorage.setItem("userId", response.data._id);
          localStorage.setItem("userEmail", response.data.email);
        }

    

      });

    this.props.history.push("/")



  }
  render() {
    return (
      <div className="row">
        <div className="col s12 m4">
        </div>
        <div className="col s12 m4" style={{ marginTop: '3rem' }}>
          <div className="card darken-1">
            <div className="card-content black-text">
              <h5 style={{ textAlign: 'center' }}>Sign in to Scapic</h5>

              <div className="row">
                <div className="input-field col s12">
                  <input id="email" type="email" onChange={(e) => this.setState({ email: e.target.value })} className="validate" />
                  <label for="email">Email</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input id="password" type="password" onChange={(e) => this.setState({ password: e.target.value })} className="validate" />
                  <label for="password">Password</label>
                </div>
              </div>


              <div className="row">
                <div className="input-field col s12">
                  <button className="btn waves-effect waves-light" style={{ width: '100%' }} onClick={() => this.handleLogin()} type="submit" name="action">Sign in
  </button>
                </div>
                <label>Forgot Password?</label>
                <label style={{ float: 'right', cursor: 'pointer' }} onClick={() => this.props.history.push("/register")}>Don't have an account?</label>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <a href="http://localhost:3006/api/oauth/facebook?type=1" className="btn waves-effect waves-light" style={{ width: '100%', backgroundColor: '#48649f' }} name="action"><i className="fab fa-facebook-f"></i> Login with facebook</a>
                  <a href="http://localhost:3006/api/oauth/google?type=1" className="btn waves-effect waves-light" style={{ width: '100%', marginTop: '1rem', backgroundColor: '#c03b2b' }} type="submit" name="action"><i class="fab fa-google-plus-g"></i>

                    Login with Google
  </a>
                </div>

              </div>




            </div>

          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Login;
