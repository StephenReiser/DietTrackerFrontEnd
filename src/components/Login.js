import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Homepage from './Homepage'

class Login extends React.Component {

    render() {
        return(
          <div className = 'col s6 m6'>
            <h4>Log In</h4>
            
        <form>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            name="email"
            id="loginEmail"
            type="email"
            onChange = {this.props.handleChange}
            value = {this.props.loginEmail}
          />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            name="password"
            id="loginPassword"
            type="password"
            onChange = {this.props.handleChange}
            value = {this.props.loginPassword}
          />
          </form>
          <br />
          <button className = 'btn'
            onClick={this.props.login}
          >
              Login
          </button>
          
          {this.props.emailSent ? <h5>Password sent.  Please check your email!</h5> : 
            
            <button className='btn' onClick = {this.props.toggleForgotPW}>Forgot Password</button>
            
            }

          {this.props.loggedIn ? <Redirect to ='/' /> : null}
          </div>
        )
    }

}

export default Login