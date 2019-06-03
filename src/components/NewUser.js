import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

class NewUser extends React.Component {
    render () {
        return(
            <>
            <h1>Create New User Form</h1>
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
          type="text"
          value={this.props.password}
          onChange={this.props.handleChange}
          placeholder="New Password"
        />
        <label htmlFor="password_confirmation">Re Enter Password</label>
        <input
          id="password_confirmation"
          name="password_confirmation"
          type="text"
          value={this.props.password_confirmation}
          onChange={this.props.handleChange}
          placeholder="Password Confirmation"
        />

        <input type="submit"></input>
        
        
          
        </form>
        {this.props.loggedIn ? <Redirect to ='/' /> : null}
            </>
        )
    }
}

export default NewUser