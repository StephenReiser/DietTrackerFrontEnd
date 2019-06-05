import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Login from './Login'
import NewUser from './NewUser'


class CombinedLogin extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            alreadySignUp: false 

        }
        this.toggleSignUp = this.toggleSignUp.bind(this)

    }
    toggleSignUp (event) {
        event.preventDefault()
        this.setState({
            alreadySignUp: !this.state.alreadySignUp
        })
    }
    render() {
        return(
            <>
            <div className = 'signUpButtonDiv center-align'>
            <button className = 'btn large signUpButton' onClick = {this.toggleSignUp}>{this.state.alreadySignUp ? "Don't have an account? Sign up here" : 'Already have an account? Log in here'}</button>
            </div>
            {this.state.alreadySignUp ? <Login login = {this.props.login} handleChange = {this.props.handleChange} loginEmail = {this.props.loginEmail} loginPassword = {this.props.loginPassword} 
            loggedIn = {this.props.loggedIn}
            currentUser = {this.props.currentUser} currentId = {this.props.currentUserId}/> : 
            
            <NewUser 
            handleAdd = {this.props.handleAdd} handleChange = {this.props.handleChange} email = {this.props.email}
            password = {this.props.password} password_confirmation = {this.props.password_confirmation}
            loggedIn = {this.props.loggedIn}
            currentUser = {this.props.currentUser} currentId = {this.props.currentUserId}/>}
            </>
        )
    }

}
export default CombinedLogin