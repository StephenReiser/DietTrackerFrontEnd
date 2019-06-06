import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

class UpdatePW extends React.Component {
render() {
    return(
       <>
       <h4>Update Password</h4>
          <form onSubmit={this.props.updateUser}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={this.props.email}
          onChange={this.props.handleChange}
          // placeholder="New Email"
          disabled
        />
         <label htmlFor="password">Password</label>
        <input
          id="editPassword"
          name="editPassword"
          type="text"
          value={this.props.editPassword}
          onChange={this.props.handleChange}
          // placeholder="New Password"
        />
        <label htmlFor="password_confirmation">Re Enter Password</label>
        <input
          id="editPassword_confirmation"
          name="editPassword_confirmation"
          type="text"
          value={this.props.editPassword_confirmation}
          onChange={this.props.handleChange}
          // placeholder="Password Confirmation"
        />

        <input className = 'btn-small' type="submit"></input>
        
        {/* <Link to='/login'>Already Have an Account? Login Here</Link> */}
          
        </form>
        {this.props.updatedPassword ? <Redirect to ='/' /> : null}
       </>
    )
}

}

export default UpdatePW


// This should only be reachable if logged in == true
// should do a check current password???
// this would be a PUT request on submit
// Probably need to have this find user by id