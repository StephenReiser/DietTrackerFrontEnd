import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import Homepage from './components/Homepage';
import Login from './components/Login'
import NewUser from './components/NewUser'
import Navbar from './components/Navbar'
import UserContext from './components/UserContext'


let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://thawing-sierra-68164.herokuapp.com'
}



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      test: 'words',
      email: '',
      password: '',
      password_confirmation: '',
      loginEmail: '',
      loginPassword: '',
      currentUser: '',
      currentUserId: '',
      loggedIn: false,
      tempID: ''
    }
    this.login = this.login.bind(this)
    this.logOut = this.logOut.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.getUser = this.getUser.bind(this)
    this.getNewUser = this.getNewUser.bind(this)
    
  }
  handleChange (event) {
    this.setState({[event.target.id] : event.target.value})
  }
  handleAdd(event) {
    event.preventDefault()
    const user = {
      "user": {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        
    }}
// console.log(user)
    fetch(baseURL + '/users/', {
      body: JSON.stringify(user),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then (createdUser => {
      const email = this.state.email
    const password = this.state.password
    const request = {"auth": {"email": email, "password": password}}
    fetch(baseURL + "/user_token", {
      body: JSON.stringify(request),
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(function(result) {
      console.dir(result)
      // don't need to see the result
      localStorage.setItem("jwt", result.jwt)
      return result.jwt
      
      // const jwtToken = result.jwt
      // this.getUser(jwtToken)
      
      
    }).then(result => this.getNewUser(result))
    
    // .then(() => {
    //   return this.setState({
    //     currentUser: email,
    //     loginEmail: '',
    //     loginPassword: '',
    //     loggedIn: true,
    //     currentUserId: this.state.tempID
    //   })
    // })
    .catch(error => console.log(error))
  // realistically should set state here to be like incorrect credentials, and then render a new view
  
  
  

    }).then(() => {
      return console.log('test')
    })
    .catch(error => console.log(error))
  }


  login () {
    // const email = document.getElementById("loginEmail").value
    // const password = document.getElementById("loginPassword").value
    const email = this.state.loginEmail
    const password = this.state.loginPassword
    const request = {"auth": {"email": email, "password": password}}
    // should update these to be on change
    // console.log(request)
    // commented out the request
    fetch(baseURL + "/user_token", {
      body: JSON.stringify(request),
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(function(result) {
      console.dir(result)
      // don't need to see the result
      localStorage.setItem("jwt", result.jwt)
      return result.jwt
      
      // const jwtToken = result.jwt
      // this.getUser(jwtToken)
      
      
    }).then(result => this.getUser(result))
    
    // .then(() => {
    //   return this.setState({
    //     currentUser: email,
    //     loginEmail: '',
    //     loginPassword: '',
    //     loggedIn: true,
    //     currentUserId: this.state.tempID
    //   })
    // })
    .catch(error => console.log(error))
  // realistically should set state here to be like incorrect credentials, and then render a new view
  
  
  }



  //This is exactly the same as getUser except changing the constants to loginEmail - should refactor
  getNewUser (jwtToken) {
    let token = "Bearer " + localStorage.getItem("jwt")
      console.log(token)
      const email = this.state.email
      fetch(baseURL + '/users', {
        method: "GET",
        headers: {
      "Authorization": token
    }
      })
      .then(response => response.json()).then((json) => {
          // return this.setState({
          // userMeals:json
          // const user = json.filter(user => user.email === this.state.loginEmail)
          // return console.log(user)
          // // }
          // )
          console.log(this.state.email)
          const user = json.filter(user => {
           return  user.email === email
          })
          return this.setState({
            currentUserId: user[0].id,
            loggedIn: true,
            currentUser: this.state.email
          })
        })
      .catch(error => console.error(error))
      

  }



  // This is exactly the same as getNewUser except this.state.email - shoudl refactor

  getUser (jwtToken) {
    let token = "Bearer " + localStorage.getItem("jwt")
      console.log(token)
      const email = this.state.loginEmail
      fetch(baseURL + '/users', {
        method: "GET",
        headers: {
      "Authorization": token
    }
      })
      .then(response => response.json()).then((json) => {
          // return this.setState({
          // userMeals:json
          // const user = json.filter(user => user.email === this.state.loginEmail)
          // return console.log(user)
          // // }
          // )
          console.log(this.state.loginEmail)
          const user = json.filter(user => {
           return  user.email === email
          })
          return this.setState({
            currentUserId: user[0].id,
            loggedIn: true,
            currentUser: this.state.loginEmail
          })
        })
      .catch(error => console.error(error))
      

  }
  logOut (event) {
    event.preventDefault()
    localStorage.clear()
    this.setState({
      currentUser: '',
      currentUserId: '',
      loggedIn: false,
      password_confirmation: '',
      loginEmail: '',
      loginPassword: '',
    })
    // I think it makes sense to alter state when logged in and logged out
  }
  

  render () {
    const { user } = {
      user: this.state
    }

    return(
      <UserContext.Provider value={user}>
      <Router>
        <Navbar />
      
        <div className = 'container'>
          <Route path = '/login' render = {() => <Login login = {this.login} handleChange = {this.handleChange} loginEmail = {this.state.loginEmail} loginPassword = {this.state.loginPassword} 
          loggedIn = {this.state.loggedIn}
          currentUser = {this.state.currentUser} currentId = {this.state.currentUserId}/>} />

          

          <Route path ='/signup' render = {() => <NewUser handleAdd = {this.handleAdd} handleChange = {this.handleChange} email = {this.state.email} password = {this.state.password} password_confirmation = {this.state.password_confirmation} loggedIn = {this.state.loggedIn}
          currentUser = {this.state.currentUser} currentId = {this.state.currentUserId}/> } />

          <button onClick = {this.logOut}>Log Out</button>

          {/* this way - when logged in state, can render just home page or just sign up page */}
          {this.state.currentUser ? <Route path= '/' exact render = {()=> <Homepage currentUser = {this.state.currentUser} currentId = {this.state.currentUserId} props = {this.state}/>} /> : null }
          
          {/* <h1>Some User Name Food Tracker</h1> */}
          
          
        
        

      </div>
      </Router>
      </UserContext.Provider>
    ) 
  }
}

export default App