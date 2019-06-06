import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Login from './Login'
import NewUser from './NewUser'
import Forgot from './ForgotPW'
import Background from '../images/background.jpg'


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
            forgotPassword: false,
            emailSent: false

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
            forgotPassword: !this.state.forgotPassword,
            emailSent: false
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
          }).then(response => response.json()).then(json => {
              console.log(json)
              return this.setState({
              emailSent: true
          })}).catch(error => console.log(error))


        // need a fetch request
    }
    render() {
        return(
            <>
            <div className='blurb'>
            Welcome to [TK site name]! Here, you can log your meals and snacks, and keep track of what makes you feel not your best. We keep things simple—no measurements or macros—and focus just on the ingredients themselves. Each time you log a new meal, you can indicate whether or not it made you feel sick. Over time, [TK site name] will keep track of your top 10 food triggers so you can notice any patterns and make informed decisions about your health. 

            </div>
            <div className = 'signUpButtonDiv center-align'>
            <button className = 'btn large signUpButton' onClick = {this.toggleSignUp}>{this.state.alreadySignUp ? "Don't have an account? Sign up here" : 'Already have an account? Log in here'}</button>
            </div>
<div className = 'row logInScreen'>
    {/* <img src={Background} alt='background' /> */}
            {this.state.forgotPassword ? <Forgot 
            handleChange = {this.props.handleChange} loginEmail = {this.props.loginEmail}
            newPassword = {this.newPassword} /> :
            <>

            {this.state.alreadySignUp ? <Login login = {this.props.login} handleChange = {this.props.handleChange} loginEmail = {this.props.loginEmail} loginPassword = {this.props.loginPassword} 
            loggedIn = {this.props.loggedIn}
            currentUser = {this.props.currentUser} currentId = {this.props.currentUserId}
            toggleForgotPW = {this.toggleForgotPW} emailSent = {this.state.emailSent}/> : 
            
            <NewUser 
            handleAdd = {this.props.handleAdd} handleChange = {this.props.handleChange} email = {this.props.email}
            password = {this.props.password} password_confirmation = {this.props.password_confirmation}
            loggedIn = {this.props.loggedIn}
            currentUser = {this.props.currentUser} currentId = {this.props.currentUserId}/>}
            </>}
            </div>
            </>
        )
    }

}
export default CombinedLogin