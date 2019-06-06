import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

class NewUser extends React.Component {
    render () {
        return(
          <div className = 'col s6 m6'>
            <h4>Sign Up</h4>
          <form onSubmit={this.props.handleAdd}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={this.props.email}
          onChange={this.props.handleChange}
          placeholder="New Email"
        />
         <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={this.props.password}
          onChange={this.props.handleChange}
          placeholder="New Password"
        />
        <label htmlFor="password_confirmation">Re Enter Password</label>
        <input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          value={this.props.password_confirmation}
          onChange={this.props.handleChange}
          placeholder="Password Confirmation"
        />

        <input className = 'btn' type="submit"></input>
        
        {/* <Link to='/login'>Already Have an Account? Login Here</Link> */}
          
        </form>
        {this.props.loggedIn ? <Redirect to ='/' /> : null}
            </div>
        )
    }
}

export default NewUser