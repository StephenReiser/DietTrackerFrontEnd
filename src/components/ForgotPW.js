import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'


class Forgot extends React.Component {
    render() {
        return(
            // <h5><Link to='/'></Link>email sent, return to login</h5>
            <div className = 'col s6 m6'>
            
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
          <button className = 'btn-small'
            onClick={this.props.newPassword}
          >
              Request New Password
          </button>
          </form>
          </div>
        )
    }
}

export default Forgot