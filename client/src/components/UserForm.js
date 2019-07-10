import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchUser } from '../actions'

import './css/style.css';

class UserForm extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    signInError: null,
    signUpError: null
  };

  signUpClick = event => {
    event.target.parentElement.parentElement.parentElement.parentElement.classList.add("right-panel-active");
    this.props.history.push('/user/signup');
  };
  signInClick = event => {
    event.target.parentElement.parentElement.parentElement.parentElement.classList.remove("right-panel-active");
    this.props.history.push('/user/signin');
  };

  signUp = event => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    axios.post("/api/user/signup", data)
      .then(res => {
        if (res.data.auth) this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ signUpError: err.response.data });
      })
  };

  signIn = event => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post("/api/user/signin", data)
      .then(res => {
        if (res.data.auth) this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ signInError: err.response.data });
      })
  };

  componentWillMount = async () => {
    await this.props.fetchUser();

    if (this.props.user) this.props.history.push('/');
  }

  render = () => {
    return (
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={this.signUp}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="/api/auth/google" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="/api/auth/facebook" className="social"><i className="fab fa-facebook-f"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" spellCheck="false" value={this.state.name} onChange={e => { this.setState({ name: e.target.value, signUpError: null }) }} placeholder="Name" />
            <input type="email" spellCheck="false" value={this.state.email} onChange={e => { this.setState({ email: e.target.value, signUpError: null }) }} placeholder="Email" />
            <input type="password" spellCheck="false" value={this.state.password} onChange={e => { this.setState({ password: e.target.value, signUpError: null }) }} placeholder="Password" />
            {(() => { if (this.state.signUpError) return <div className="error"><i className="fa fa-exclamation-circle warning"></i>{this.state.signUpError}</div> })()}
            <button className="signUp">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={this.signIn}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="/api/auth/google" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="/api/auth/facebook" className="social"><i className="fab fa-facebook-f"></i></a>
            </div>
            <span>or use your account</span>
            <input name="username" type="text" autoComplete="username email" spellCheck="false" value={this.state.email} onChange={e => { this.setState({ email: e.target.value, signInError: null }) }} placeholder="Email" />
            <input name="password" type="password" spellCheck="false" autoComplete="password" value={this.state.password} onChange={e => { this.setState({ password: e.target.value, signInError: null }) }} placeholder="Password" />
            {(() => {
              if (this.state.signInError) return <div className="error"><i className="fa fa-exclamation-circle warning"></i>{this.state.signInError}</div>
            })()}
            <button className="signIn">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={this.signInClick}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={this.signUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { fetchUser })(UserForm);