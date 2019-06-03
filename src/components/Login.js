import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Homepage from './Homepage'

class Login extends React.Component {

    render() {
        return(
            <>
            <h1>Log IN FORM = WORKS</h1>
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
          <button
            onClick={this.props.login}
          >
              Login
          </button>
          {this.props.loggedIn ? <Redirect to ='/' /> : null}
          </>
        )
    }

}

export default Login