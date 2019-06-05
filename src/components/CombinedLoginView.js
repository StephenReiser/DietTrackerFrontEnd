import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Login from './Login'
import NewUser from './NewUser'
import Forgot from './ForgotPW'


let baseURL = ''
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3000'
  } else {
    baseURL = 'https://thawing-sierra-68164.herokuapp.com'
  }
  


class CombinedLogin extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            alreadySignUp: false,
            forgotPassword: false

        }
        this.toggleSignUp = this.toggleSignUp.bind(this)
        this.toggleForgotPW = this.toggleForgotPW.bind(this)
        this.newPassword = this.newPassword.bind(this)

    }
    toggleSignUp (event) {
        event.preventDefault()
        this.setState({
            alreadySignUp: !this.state.alreadySignUp
        })
    }
    toggleForgotPW (event) {
        event.preventDefault()
        this.setState({
            forgotPassword: !this.state.forgotPassword
        })
    }

    newPassword (event) {
        event.preventDefault()
        console.log(this.props.loginEmail)
        this.setState({forgotPassword: !this.state.forgotPassword})
        const email = {
            "email": this.props.loginEmail
        }
        console.log(email)
        fetch(baseURL + `/password_reset`, {
            body: JSON.stringify(email),
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              
            }
          }).then(response => response.json()).then(json => console.log(json)).catch(error => console.log(error))


        // need a fetch request
    }
    render() {
        return(
            <>
            <div className = 'signUpButtonDiv center-align'>
            <button className = 'btn large signUpButton' onClick = {this.toggleSignUp}>{this.state.alreadySignUp ? "Don't have an account? Sign up here" : 'Already have an account? Log in here'}</button>
            </div>

            {this.state.forgotPassword ? <Forgot 
            handleChange = {this.props.handleChange} loginEmail = {this.props.loginEmail}
            newPassword = {this.newPassword}/> :
            <>

            {this.state.alreadySignUp ? <Login login = {this.props.login} handleChange = {this.props.handleChange} loginEmail = {this.props.loginEmail} loginPassword = {this.props.loginPassword} 
            loggedIn = {this.props.loggedIn}
            currentUser = {this.props.currentUser} currentId = {this.props.currentUserId}
            toggleForgotPW = {this.toggleForgotPW}/> : 
            
            <NewUser 
            handleAdd = {this.props.handleAdd} handleChange = {this.props.handleChange} email = {this.props.email}
            password = {this.props.password} password_confirmation = {this.props.password_confirmation}
            loggedIn = {this.props.loggedIn}
            currentUser = {this.props.currentUser} currentId = {this.props.currentUserId}/>}
            </>}
            </>
        )
    }

}
export default CombinedLogin