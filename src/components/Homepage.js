import React from 'react'
import Meals from './Meals'


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
    }
    componentDidMount() {
        this.getMeals()
      }
    getMeals (){
        
        fetch(baseURL + 'users/1/meals')
        .then(response => response.json()).then((json) => {
            return this.setState({
            userMeals:json
            }
            )})
        .catch(error => console.error(error))
        }

    render () {
          return(
              <div className = 'row'>
                <div className = 'col m3'>
                form will go hereform will go hereform will go hereform will go hereform will go hereform will go hereform will go hereform will go hereform will go hereform will go here
                </div>
                <div className = 'col m9'>
                LOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this outLOTS OF STUFF GOES HERE  testing this out
                </div>
                {/* <div className = 'row'> */}
                <div className = 'col m12'>
                    <Meals userMeals = {this.state.userMeals}/>
                </div>
                {/* </div> */}
            </div>
          )
      }
}


export default Homepage