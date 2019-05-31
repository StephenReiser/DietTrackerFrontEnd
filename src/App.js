import React from 'react';

import Homepage from './components/Homepage';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      test: 'words'
    }
    
  }
  

  render () {
    return(
      <div className = 'container'>
        <h1>Some User Name Food Tracker</h1>

        {/* this way - when logged in state, can render just home page or just sign up page */}
        <Homepage />
          
        
        

      </div>
    ) 
  }
}

export default App