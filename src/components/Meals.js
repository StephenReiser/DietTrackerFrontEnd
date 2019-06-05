import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import Meal from './Meal'
import Form from './Form'
import UserContext from './UserContext'
// import Chart from './Chart'
var Chart = require("chart.js");
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
            sickArray: [],
            displayAddForm: false

        }
        this.handleAdd = this.handleAdd.bind(this)
        this.getMeals = this.getMeals.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.toggleSick = this.toggleSick.bind(this)
        this.makeChart = this.makeChart.bind(this)
        this.toggleAdd = this.toggleAdd.bind(this)
    }
    componentWillMount() {
      
        this.getMeals()
        // this.makeChart()
      }


      // For some reason currentId isn't getting passed down

      makeChart(sickStringArray) {
        const node = this.node;
        let smallArray = []
        if (sickStringArray.length > 10) {
          smallArray = sickStringArray.slice(sickStringArray.length - 10, sickStringArray.length)

        } else {
          smallArray = sickStringArray
        }
        let labelSet = []
        let dataSet = []
        for (let i = 0; i < smallArray.length; i ++) {
            labelSet.push(smallArray[i][0])
            dataSet.push(smallArray[i][1])
        }
        var myChart = new Chart(node, {
          type: "bar",
          data: {
            labels: labelSet,
            datasets: [
              {
                label: "Top Foods that make you Sick!",
                data: dataSet,
                backgroundColor: 
                  "rgba(255, 99, 132, 0.2)"
                //   "rgba(54, 162, 235, 0.2)",
                //   "rgba(255, 206, 86, 0.2)"
                
              }
            ]
          },
          options: {scales: {
            yAxes: [{display: true, ticks: {
              beginAtZero: true
            }}]
          }}
        });
      }
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
          this.makeChart(json.stringResult)
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
          this.makeChart(jsonMeal.sickString)
          return this.setState({
            userMeals: [jsonMeal.meal, ...this.state.userMeals],
            sickArray: jsonMeal.sickString,
            displayAddForm: false
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
            this.makeChart(json.sickString)
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
          this.makeChart(updatedMeal.sickString)
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
          this.makeChart(updatedMeal.sickString)
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

        toggleAdd (event) {
          event.preventDefault()
          this.setState({
            displayAddForm: !this.state.displayAddForm
          })
        }


    render() {
      // let key = ''
      // let labelSet = []
      // let dataSet = []
      // for (let i = 0; i < this.state.sickArray.length; i ++) {
      //     labelSet.push(this.state.sickArray[i][0])
      //     dataSet.push(this.state.sickArray[i][1])
      // }
        return(
            <UserContext.Consumer>
              {user => (
                <>
                {/* {this.state.sickArray.length > 1 ? <Chart sickArray = {this.state.sickArray} /> : null} */}
                <div className='center-align logoutButtonDiv'>
                <button className = 'btn' onClick={this.toggleAdd}>{this.state.displayAddForm ? 'Close new meal form': "Log new meal"}</button></div>
                {this.state.displayAddForm ? <Form handleSubmit = {this.handleAdd} user_id = {this.props.currentId}/> : null}
                
                <canvas
                style={{ width: 800, height: 300 }}
                ref={node => (this.node = node)}
        />
                
                {/* <h1>{user.currentUserId}</h1>
                <h1>{this.props.currentId}</h1> */}
                {/* <ul>
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
                </ul> */}
                
            
            <div className = 'row cardContainer'>
            
            
            
            {/* <InfiniteScroll
    pageStart={0}
    loadMore={loadFunc}
    hasMore={true || false}
    loader={<div className="loader" key={0}>Loading ...</div>}
>
{
  <> */}
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
                  {/* </>} 
                  // <-- This is the content you want to load
                  </InfiniteScroll> */}
              </div>
              </>
              )}
              </UserContext.Consumer>
            
        )
    }
}

export default Meals