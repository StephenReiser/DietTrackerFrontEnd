import React from 'react';
import Meals from './components/Meals'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userMeals: [],
      test: 'words'
    }
    this.getMeals = this.getMeals.bind(this)
  }
  componentDidMount() {
    this.getMeals()
  }
  getMeals (){
    
    fetch('http://localhost:3000/users/1/meals')
    .then(response => response.json()).then((json) => {
      return this.setState({
        userMeals:json
      }
      )})
    .catch(error => console.error(error))
  }

  render () {
    return(
      <div className = 'container'>
        <h1>Some User Name Food Tracker</h1>
        <Meals userMeals = {this.state.userMeals}/>
          
        
        

      </div>
    ) 
  }
}

export default App