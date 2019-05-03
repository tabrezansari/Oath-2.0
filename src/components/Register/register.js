import React, { Component } from 'react';
import config from "../../config/config";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { Toaster, ToastContainer } from 'ic-react-toast';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
      passwordcnf: null,
      isLoading: false

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

  submitRegister = () => {
    let header = this.setAuthHeaders();
    let payLoad = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    }
     if(this.state.password=== this.state.passwordcnf && this.state.email && this.state.name){
      axios.post(config.apiUrl + "/api/users/register", payLoad, header)
      .then(function (response) {
        console.log(response);


      });
      this.props.history.push("login")


     }
     else{
       Toaster.error("fill details correctly")
     }
   

  }

  loaderRender() {
    return (
      <div className="container" style={{ width: '100px', position: 'relative', top: '15rem' }}>
        <Loader
          type="Watch"
          color="#00BFFF"
          height="100"
          width="100"
        />  </div>
    )
  }

  Registerrender() {

    return (
      <div class="row">
        <div class="col s12 m3"></div>
        <div class="col s12 m6">
          <div class="card darken-1">
            <div class="card-content black-text">
              <h5 style={{ textAlign: 'center' }}>Register to Scapic</h5>

              <div class="row">
                <div class="input-field col s12">
                  <input id="name" type="text" onChange={(e) => this.setState({ name: e.target.value })} class="validate" required />
                  <label for="name">Full Name</label>
                </div>
              </div>


              <div class="row">
                <div class="input-field col s12">
                  <input id="email" type="email" onChange={(e) => this.setState({ email: e.target.value })} class="validate" required />
                  <label for="email">Email</label>
                </div>
              </div>



              <div class="row">
                <div class="input-field col s6">
                  <input id="password" type="password" onChange={(e) => this.setState({ password: e.target.value })} class="validate" required />
                  <label for="password">Password</label>
                </div>
                <div class="input-field col s6">
                  <input id="passwordcnf" type="password" onChange={(e) => this.setState({ passwordcnf: e.target.value })} class="validate" required />
                  <label for="password" >Password Confirm</label>
                </div>
              </div>


              <div class="row">
                <div class="input-field col s12">
                  <button class="btn waves-effect waves-light" onClick={() => this.submitRegister()} style={{ width: '100%' }} type="submit" name="action">Sign up
    </button>

                </div> <label>Forgot Password?</label>
                <label style={{ float: 'right', cursor: 'pointer' }} onClick={() => this.props.history.push("/login")}> have an account?</label>
              </div>

              <div class="row">
                <div class="input-field col s12">
                  <a href="http://localhost:3006/api/oauth/facebook?type=2" class="btn waves-effect waves-light" style={{ width: '100%', backgroundColor: '#48649f' }} type="submit" name="action">Signup with facebook
    </a>
                  <a href="http://localhost:3006/api/oauth/google?type=2" class="btn waves-effect waves-light" style={{ width: '100%', marginTop: '1rem', backgroundColor: '#c03b2b' }} type="submit" name="action">Signup with Google
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

  render() {
    return (
      <div>
        {this.state.isLoading ? (this.loaderRender()) : (this.Registerrender())}
      </div>
    )
  }

}

export default Register;
