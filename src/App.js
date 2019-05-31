import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount () {
    this.getMeals()
  }
  getMeals () {
    fetch('http://localhost:3000/users').then(response => response.json()).then(json => console.log(json))
  }


  render () {
    return(
      <div className = 'container'>
        <h1>We did it</h1>
      </div>
    ) 
  }
}

export default App