import React from 'react'



class Meal extends React.Component {
    render() {
        return(
                <div>
                  <h4>{this.props.fullDate}  {this.props.meal.title}</h4>
                  <p>{this.props.meal.sick ? `This made your ${this.props.meal.sick_type} sick` : 'Not Sick'}</p>
                  <ul>
                    {this.props.meal.food_name.map(food => {
                      return (<li>{food}</li>)
                    })}
                    {/* <li>test</li> */}
                  </ul>
                  <p>Your Comments: {this.props.meal.comments}</p>
                  <button>Toggle Sick</button>
                  <button>Edit Button</button>
                </div>


        )
    }
}

export default Meal