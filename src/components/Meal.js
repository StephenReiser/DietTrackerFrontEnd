import React from 'react'
import Form from './Form'
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

    }
    // this.deleteMeal = this.deleteMeal.bind(this)

  }
  
    render() {
        return(
                <div key={this.props.meal.id}>
                  <h4>{this.props.fullDate}  {this.props.meal.title}</h4>
                  <p>{this.props.meal.sick ? `This made your ${this.props.meal.sick_type} sick` : 'Not Sick'}</p>
                  <h5>{this.props.meal.food_name}</h5>
                  {/* <ul>
                    {this.props.meal.food_name.map(food => {
                      return (<li key={food}>{food}</li>)
                    })}
                    
                  </ul> */}
                  <p>Your Comments: {this.props.meal.comments}</p>
                  <button>Toggle Sick</button>
                  <button>Edit Button</button>
                  <button onClick={() => this.props.handleDelete(this.props.meal)}>Delete</button>
                  <Form />
                </div>


        )
    }
}

export default Meal