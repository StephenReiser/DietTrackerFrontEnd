import React from 'react'
import Meal from './Meal'



class Meals extends React.Component {
    render() {
        return(
            <>
            {this.props.userMeals.map(meal => {
                const date = new Date(meal.created_at)
                const year = date.getUTCFullYear()
                const month = date.getUTCMonth() + 1
                const day = date.getUTCDate()
                const fullDate = month + "/" + day + "/" + year
                return (
                      <Meal fullDate = {fullDate} meal = {meal}/>
                
                )
              })}
              </>
            
        )
    }
}

export default Meals