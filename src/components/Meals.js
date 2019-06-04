import React from 'react'
import Meal from './Meal'
import Form from './Form'
import UserContext from './UserContext'

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
            userMeals: [],
            test: 0,
            sickArray: []

        }
        this.handleAdd = this.handleAdd.bind(this)
        this.getMeals = this.getMeals.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.toggleSick = this.toggleSick.bind(this)
    }
    componentWillMount() {
      
        this.getMeals()
      }


      // For some reason currentId isn't getting passed down
    getMeals (){
        console.log(baseURL + `/users/${this.props.currentId}/meals`)
        console.log(this.props)
        // console.log(this.context.user)
        
        
        let token = "Bearer " + localStorage.getItem("jwt")
        fetch(baseURL + `/users/${this.props.currentId}/meals`, {
          method: "GET",
          headers: {
        "Authorization": token
      }
        })
        .then(response => response.json()).then((json) =>
         
        {
          console.log(json)
            return this.setState({
            userMeals:json.meals,
            sickArray: json.stringResult
            }
            )})
        .catch(error => console.error(error))
        }

    handleAdd(event, formInputs) {
        event.preventDefault()
        // const foodArr = formInputs.food_meal.split(' ')
        // console.log(foodArr)
        // formInputs.food_meal = foodArr
        const token = "Bearer " + localStorage.getItem("jwt")
        console.log(formInputs)
        console.log(baseURL + `/users/${this.props.currentId}/meals`)
        fetch(baseURL + `/users/${this.props.currentId}/meals`, {
          body: JSON.stringify(formInputs),
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            "Authorization": token
          }
        })
        .then (createdMeal => {
          return createdMeal.json()
        })
        .then (jsonMeal => {
          // console.log(jsonMeal.sickString)
          return this.setState({
            userMeals: [jsonMeal.meal, ...this.state.userMeals],
            sickArray: jsonMeal.sickString
            //  Probably shoudl set state here with the new sickString
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
          }}).then(response => response.json()).
          then(json => {
            console.log(json)
              this.setState(state => {
                  const userMeals = state.userMeals.filter(meal => meal.id !== deletedMeal.id)
                  return {
                    userMeals,
                    sickArray: json.sickString
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
        }).then(response => response.json())
         .then(updatedMeal => {
          //  this is making the whole thing rerender - need to splice it
          // const editHouses = houses.filter()
          //  this.getMeals()
          console.log(updatedMeal)
           const copyMeals = [...this.state.userMeals]
           const findIndex = this.state.userMeals.findIndex(meal => meal.id === formInputs.mealId)
           copyMeals[findIndex] = updatedMeal.meal
           this.setState({
             userMeals: copyMeals,
             sickArray: updatedMeal.sickString
            // foodArr: copyMeals.food_name.split(' ')
          })
         })
         .catch(error => console.log(error))
        }

        // toggleSick (user_id, mealId, sick_status) {
        //   // event.preventDefault()
        //   console.log(user_id, mealId)
        //   let token = "Bearer " + localStorage.getItem("jwt")
        //   let sickUpdate = !sick_status
        //   console.log(JSON.stringify(`meal[sick]=${sickUpdate}`))
        

        //   fetch(baseURL + `/users/${user_id}/meals/${mealId}`, {
        //     body: `meal[sick]=${sickUpdate}`,
        //     method: 'PATCH',
        //  headers: {
        //    'Accept': 'application/json, text/plain, */*',
        //    'Content-Type': 'application/json',
        //    "Authorization": token
        //  }
        // })
        //  .then(updatedMeal => {
        //   //  this is making the whole thing rerender - need to splice it
        //   // const editHouses = houses.filter()
        //    this.getMeals()
        //  })
        //  .catch(error => console.log(error))
        // }

        toggleSick (formInputs, user_id) {
          // event.preventDefault()
          console.log(formInputs)
          formInputs.sick = !formInputs.sick
          console.log(formInputs)
          let token = "Bearer " + localStorage.getItem("jwt")
          fetch(baseURL + `/users/${user_id}/meals/${formInputs.id}`, {
            body: JSON.stringify(formInputs),
            method: 'PUT',
         headers: {
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/json',
           "Authorization": token
         }
        }).then(response => response.json())
        .then(updatedMeal => {
          console.log(updatedMeal)
         //  this is making the whole thing rerender - need to splice it
         // const editHouses = houses.filter()
         //  this.getMeals()
          const copyMeals = [...this.state.userMeals]
          const findIndex = this.state.userMeals.findIndex(meal => meal.id === formInputs.mealId)
          copyMeals[findIndex] = updatedMeal
          this.setState({
            userMeals: copyMeals,
            sickArray: updatedMeal.sickString
          })
        })
         .catch(error => console.log(error))
        }



    render() {
      // let key = ''
        return(
            <UserContext.Consumer>
              {user => (
                <>
                {/* <h1>{user.currentUserId}</h1>
                <h1>{this.props.currentId}</h1> */}
                <ul>
                  {this.state.sickArray.map(sickItem => {
                    for(let i = 0; i < this.state.sickArray.length; i++) {
                      // if(this.state.sickArray[i][0] === sickItem[0]) {
                      //   key = i
                      // }
                    }
                    return(
                      <li>{sickItem[0]}: {sickItem[1]} </li>
                    )
                  })}
                </ul>
            <Form handleSubmit = {this.handleAdd} user_id = {this.props.currentId}/>
            {this.state.userMeals.map(meal => {
                const date = new Date(meal.created_at)
                const year = date.getUTCFullYear()
                const month = date.getUTCMonth() + 1
                const day = date.getUTCDate()
                const fullDate = month + "/" + day + "/" + year
                // let foodArr = ''
                // {this.state.foodArr ? foodArr = this.state.foodArr : foodArr = meal.food_name.split(' ')}
                // const foodArr = meal.food_name.split(' ')
                return (
                      <Meal fullDate = {fullDate} meal = {meal} key={meal + meal.id} handleDelete = {this.handleDelete} user_id = {this.props.user_id}
                      // foodArr = {foodArr}
                      handleEdit = {this.handleUpdate} toggleSick = {this.toggleSick} allMeals = {this.state.userMeals}
                      sickArray = {this.state.sickArray}/>
                
                )
              })}
              </>
              )}
              </UserContext.Consumer>
            
        )
    }
}

export default Meals