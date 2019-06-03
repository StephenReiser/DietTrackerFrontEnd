import React from 'react'
import Form from './Form'
import UserContext from './UserContext'
let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://thawing-sierra-68164.herokuapp.com'
}


class Meal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editAvailable: false,

    }
    // this.deleteMeal = this.deleteMeal.bind(this)
    this.showEdit = this.showEdit.bind(this)

  }
  
  showEdit (event) {
    // event.preventDefault()
    this.setState({
      editAvailable: !this.state.editAvailable
    })
  }


    render() {
        return(
          <UserContext.Consumer>
              {user => (
                <div key={this.props.meal.id}>
                  <h4>{this.props.fullDate}  {this.props.meal.title}</h4>
                  <p>{this.props.meal.sick ? `This made your ${this.props.meal.sick_type} sick` : 'Not Sick'}</p>
                  <h5>{this.props.meal.food_name}</h5>
                  {/* <ul>
                    {this.props.meal.food_name.map(food => {
                      return (<li key={food}>{food}</li>)
                    })}
                    
                  </ul> */}
                  <p>Your Comments: {this.props.meal.comments}
                  User: ID: {this.props.meal.user_id}</p>
                  <button onClick = {() => this.props.toggleSick(this.props.meal, user.currentUserId)}>Toggle Sick</button>
                  <button onClick = {this.showEdit}>Edit Button</button>
                  <button onClick={() => this.props.handleDelete(this.props.meal)}>Delete</button>

                  {this.state.editAvailable ? <Form meal = {this.props.meal} handleSubmit = {this.props.handleEdit} comments = {this.props.meal.comments} food_name={this.props.meal.food_name} sick = {this.props.meal.sick} sick_type = {this.props.meal.sick_type} title = {this.props.meal.title} user_id = {this.props.user_id} editAvailable = {this.state.editAvailable} showEdit = {this.showEdit}/> : null }
                  
                </div>

              )}
              </UserContext.Consumer>
        )
    }
}

export default Meal


// need to pass to MEAL: handle add handle change and user id