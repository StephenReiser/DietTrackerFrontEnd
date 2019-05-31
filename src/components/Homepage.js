import React from 'react'
import Meals from './Meals'
import Form from './Form'

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
            userMeals: []
        }
        this.getMeals = this.getMeals.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    componentDidMount() {
        this.getMeals()
      }
    getMeals (){
        
        fetch(baseURL + '/users/1/meals')
        .then(response => response.json()).then((json) => {
            return this.setState({
            userMeals:json
            }
            )})
        .catch(error => console.error(error))
        }

        handleAdd(event, formInputs) {
            event.preventDefault()
            console.log(formInputs)
            fetch(baseURL + '/users/1/meals', {
              body: JSON.stringify(formInputs),
              method: 'POST',
              headers: {
                'Accept': 'applciation/json, text/plain, */*',
                'Content-Type': 'application/json'
              }
            })
            .then (createdMeal => {
              return createdMeal.json()
            })
            .then (jsonMeal => {
              return this.setState({
                userMeals: [jsonMeal, ...this.state.userMeals]
                // currently houses isn't getting read
              })
            })
            .catch(error => console.log(error))
          }

          handleDelete (deletedMeal) {
            fetch(baseURL + `/users/1/meals/${deletedMeal.id}`, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              }}).then(json => {
                  this.setState(state => {
                      const userMeals = state.userMeals.filter(meal => meal.id !== deletedMeal.id)
                      return {
                        userMeals
                      }
                  })
              }).catch(error => {console.log(error)})
            
            
            }

    render () {
          return(
              <div className = 'row'>
                <div className = 'col m3'>
                <Form handleSubmit = {this.handleAdd}/>
                </div>
                <div className = 'col m9'>
                LOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this out
                </div>
                {/* <div className = 'row'> */}
                <div className = 'col m12'>
                    <Meals userMeals = {this.state.userMeals} handleDelete = {this.handleDelete}/>
                </div>
                {/* </div> */}
            </div>
          )
      }
}


export default Homepage