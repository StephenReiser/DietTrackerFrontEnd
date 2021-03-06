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
                
<>
                  {this.state.editAvailable ? <div className="col s12 m6"><Form meal = {this.props.meal} handleSubmit = {this.props.handleEdit} comments = {this.props.meal.comments} food_name={this.props.meal.food_name} sick = {this.props.meal.sick} sick_type = {this.props.meal.sick_type} title = {this.props.meal.title} user_id = {user.currentUserId} editAvailable = {this.state.editAvailable} showEdit = {this.showEdit}/> </div> : 
                  <div className="col s12 m6">
                    
                  <div key={this.props.meal.id} className = {this.props.meal.sick ? 'mealSick card small' : 'mealHealthy card small' }>
                    <div className = 'scrollDiv'>
                  <div className='card-content'>
                    <h4 className = 'card-title'>{this.props.fullDate}  {this.props.meal.title}</h4>
                    
                    <p>{this.props.meal.sick ? `This made you sick` : 'This did not make you sick'}</p>
                    {/* <h5>{this.props.meal.food_name}</h5> */}
                    {/* <ul>
                      {this.props.foodArr.map(item => <li key = {item + this.props.meal.id}>{item}</li>)}
                    </ul> */}
                    <div className = 'listDiv'>
                      <h5>Your meal contained:</h5>
                    <ul className = 'listUL'>
                      
                      {this.props.meal.food_name.replace(/,/g, ' ').replace(/  /g, ' ').split(' ').map(food => {
                        let key = ''
                        // for (let i = 0; i < this.props.sickArray.length; i++) {
                        //   if (this.props.sickArray[i][0] === food.toLowerCase()) {
                        //     key = this.props.sickArray[i][1]
                        //   }
                        // }
                      //   if (this.props.sickArray.length < 5) {
                      //     for (let i = this.props.sickArray.length -1 ; i >= 0; i--) {
                      //       if (this.props.sickArray[i][0] === food.toLowerCase()) {
                      //         key = 'red'
                      //     }
                      //   }
                      // } else {
                        for (let i = this.props.sickArray.length -1 ; i >= 0; i--) {
                          if (this.props.sickArray[i][0] === food.toLowerCase() && i > this.props.sickArray.length - 6) {
                            key = 'red'
                          } else if (this.props.sickArray[i][0] === food.toLowerCase() && i > this.props.sickArray.length - 11 && i <= this.props.sickArray.length - 6) {
                            key = 'yellow'
                          } else if(this.props.sickArray[i][0] === food.toLowerCase() && i <= this.props.sickArray.length - 11) {
                            
                          }
                        }
                      // }
                        return (<li key={food} >{food.toLowerCase()} {key === 'red' ? <i className="far fa-dizzy"></i> : 
                        <>{key === 'yellow' ? <i className="far fa-frown-open"></i> : null } </>
                      }</li>)
                      })}
                      {/* maybe add colors based on number of times sick */}
                    </ul>
                    </div>
                    <div className='comments'>Your Comments: {this.props.meal.comments}
                    {/* User: ID: {this.props.meal.user_id} */}
                    </div>
                    </div>
                    </div>
                    <div className="card-action bottomAbs">
                    <button className = 'btn-small' onClick = {() => this.props.toggleSick(this.props.meal, user.currentUserId)}>{this.props.meal.sick ? 'Oops, not sick' : "Ugh, I'm sick"}</button>
                    <button className = 'btn-small' onClick = {this.showEdit}>Edit Meal</button>
                    <button className = 'btn-small' onClick={() => this.props.handleDelete(this.props.meal)}>Delete</button>
                    </div></div></div> }
                  </>
               
              )}
              </UserContext.Consumer>
        )
    }
}

export default Meal


// need to pass to MEAL: handle add handle change and user id



// If food is part of meals - will need to parse through userMeals and count if meals made someone sick and if ILIKE the word - or can I run this in the meals route?