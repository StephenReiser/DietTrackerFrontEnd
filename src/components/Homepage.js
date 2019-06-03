import React from 'react'
import Meals from './Meals'
import Form from './Form'
import UserContext from './UserContext'

// url to front end: https://protected-thicket-74691.herokuapp.com/

let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://thawing-sierra-68164.herokuapp.com'
}


class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        // this.getMeals = this.getMeals.bind(this)
        // this.handleAdd = this.handleAdd.bind(this)
        // this.handleDelete = this.handleDelete.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
        
        // this.handleUpdate = this.handleUpdate.bind(this)
    }
  
     
          
    render () {
          return(
            // <UserContext.Consumer>
            //   {user => (
              <div className = 'row'>
                <div className = 'col m3'>
                {/* <Form handleSubmit = {this.handleAdd} user_id = {this.state.user_id}/> */}

                {/* comments = {this.state.comments} food_name={this.state.food_name} sick = {this.state.sick} sick_type = {this.state.sick_type} title = {this.state.title}  */}
                </div>
                <div className = 'col m9'>
                LOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this out
                </div>
                {/* <div className = 'row'> */}
                <div className = 'col m12'>
                    <Meals currentUser = {this.props.currentUser} currentId = {this.props.currentId}
                    IDTEST = {this.props.currentId} props = {this.props}/>
                </div>
                {/* </div> */}
            </div>
            // )}
            // </UserContext.Consumer>
          )
      }
}


export default Homepage