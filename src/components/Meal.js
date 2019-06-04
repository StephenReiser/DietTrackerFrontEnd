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
    // this.splitFood = this.splitFood.bind(this)

  }
  // componentWillMount () {
  //   // this.splitFood() 
  //   // this works but isn't running on edit
  // }
  showEdit (event) {
    // event.preventDefault()
    this.setState({
      editAvailable: !this.state.editAvailable
    })
  }

  // splitFood () {
  //   this.setState({
  //     foodArr: this.props.meal.food_name.split(' ')
  //   })
  // }


    render() {
      // const foodArr = this.props.meal.food_name.split(' ')
        return(
          <UserContext.Consumer>
              {user => (
                <div key={this.props.meal.id}>
                  <h4>{this.props.fullDate}  {this.props.meal.title}</h4>
                  <p>{this.props.meal.sick ? `This made your ${this.props.meal.sick_type} sick` : 'Not Sick'}</p>
                  {/* <h5>{this.props.meal.food_name}</h5> */}
                  {/* <ul>
                    {this.props.foodArr.map(item => <li key = {item + this.props.meal.id}>{item}</li>)}
                  </ul> */}
                  <ul>
                    {/* to be smarter - should do something like remove , before splitting and 'and' */}
                    {/* ADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTIONADDING SPACE TO DRAW ATTENTION */}
                    {this.props.meal.food_name.split(' ').map(food => {
                      let key = 0
                      for (let i = 0; i < this.props.sickArray.length; i++) {
                        if (this.props.sickArray[i][0] === food.toLowerCase()) {
                          key = this.props.sickArray[i][1]
                        }
                      }
                      return (<li key={food}>{food.toLowerCase()} count: {key}</li>)
                    })}
                    
                  </ul>
                  <p>Your Comments: {this.props.meal.comments}
                  User: ID: {this.props.meal.user_id}</p>
                  <button onClick = {() => this.props.toggleSick(this.props.meal, user.currentUserId)}>Toggle Sick</button>
                  <button onClick = {this.showEdit}>Edit Button</button>
                  <button onClick={() => this.props.handleDelete(this.props.meal)}>Delete</button>

                  {this.state.editAvailable ? <Form meal = {this.props.meal} handleSubmit = {this.props.handleEdit} comments = {this.props.meal.comments} food_name={this.props.meal.food_name} sick = {this.props.meal.sick} sick_type = {this.props.meal.sick_type} title = {this.props.meal.title} user_id = {user.currentUserId} editAvailable = {this.state.editAvailable} showEdit = {this.showEdit}/> : null }
                  
                </div>

              )}
              </UserContext.Consumer>
        )
    }
}

export default Meal


// need to pass to MEAL: handle add handle change and user id



// If food is part of meals - will need to parse through userMeals and count if meals made someone sick and if ILIKE the word - or can I run this in the meals route?