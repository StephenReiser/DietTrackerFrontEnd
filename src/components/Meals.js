import React from 'react'
import Meal from './Meal'
import Form from './Form'

let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://thawing-sierra-68164.herokuapp.com'
}


class Meals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userMeals: []

        }
        this.handleAdd = this.handleAdd.bind(this)
        this.getMeals = this.getMeals.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }
    componentWillMount() {
        this.getMeals()
      }
    getMeals (){
        console.log(baseURL + `/users/${this.props.currentId}/meals`)
        let token = "Bearer " + localStorage.getItem("jwt")
        fetch(baseURL + `/users/${this.props.currentId}/meals`, {
          method: "GET",
          headers: {
        "Authorization": token
      }
        })
        .then(response => response.json()).then((json) => {
            return this.setState({
            userMeals:json
            }
            )})
        .catch(error => console.error(error))
        }

    handleAdd(event, formInputs) {
        event.preventDefault()
        let token = "Bearer " + localStorage.getItem("jwt")
        console.log(formInputs)
        console.log(baseURL + `/users/${this.props.currentId}/meals`)
        fetch(baseURL + `/users/${this.props.currentId}/meals`, {
          body: JSON.stringify(formInputs),
          method: 'POST',
          headers: {
            'Accept': 'applciation/json, text/plain, */*',
            'Content-Type': 'application/json',
            "Authorization": token
          }
        })
        .then (createdMeal => {
          return createdMeal.json()
        })
        .then (jsonMeal => {
          return this.setState({
            userMeals: [jsonMeal, ...this.state.userMeals]
            //  Add is working - probably should be resetting input form
          })
        })
        .catch(error => console.log(error))
      }

      handleDelete (deletedMeal) {
        // event.preventDefault()
        let token = "Bearer " + localStorage.getItem("jwt")
        fetch(baseURL + `/users/${this.props.currentId}/meals/${deletedMeal.id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            "Authorization": token
          }}).then(json => {
              this.setState(state => {
                  const userMeals = state.userMeals.filter(meal => meal.id !== deletedMeal.id)
                  return {
                    userMeals
                  }
              })
          }).catch(error => {console.log(error)})
        
        
        }
       
        handleUpdate (event, formInputs) {
          event.preventDefault()
          console.log(formInputs)
          let token = "Bearer " + localStorage.getItem("jwt")
          fetch(baseURL + `/users/${formInputs.user_id}/meals/${formInputs.mealId}`, {
            body: JSON.stringify(formInputs),
            method: 'PUT',
         headers: {
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/json',
           "Authorization": token
         }
        })
         .then(updatedMeal => {
          //  this is making the whole thing rerender - need to splice it
          // const editHouses = houses.filter()
           this.getMeals()
         })
         .catch(error => console.log(error))
        }
    render() {
        return(
            <>
            <Form handleSubmit = {this.handleAdd} user_id = {this.props.currentId}/>
            {this.state.userMeals.map(meal => {
                const date = new Date(meal.created_at)
                const year = date.getUTCFullYear()
                const month = date.getUTCMonth() + 1
                const day = date.getUTCDate()
                const fullDate = month + "/" + day + "/" + year
                return (
                      <Meal fullDate = {fullDate} meal = {meal} key={meal + meal.id} handleDelete = {this.handleDelete} user_id = {this.props.user_id}
                      handleEdit = {this.handleUpdate}/>
                
                )
              })}
              </>
            
        )
    }
}

export default Meals