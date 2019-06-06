import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class Navbar extends Component {
render() {
    return (
        <>
<nav>
    <div className="nav-wrapper">
      <a href="#!" className="brand-logo">Project Title</a>
      <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        
        <li><Link to='/'>Home</Link></li>
            <li onClick = {this.props.resetUpdatePasswordState} ><Link to='/updatePW' >Update Password</Link></li>
    <li><button className='btn newMealButton' onClick = {this.props.logOut}><Link to = '/' className = 'linkDark'>LogOut</Link></button></li>
      </ul>
    </div>
  </nav>

  <ul className="sidenav" id="mobile-demo">
    <li><Link to='/'>Home</Link></li>
            <li onClick = {this.props.resetUpdatePasswordState} ><Link to='/updatePW' >Update Password</Link></li>
    <li><button className='btn newMealButton' onClick = {this.props.logOut}><Link to = '/' className = 'linkDark'>LogOut</Link></button></li>
    
  </ul>
  </>
    )
}
}
export default Navbar





// <nav>
//             <div className = 'row'>
//                 <div className = 'col 23'>
//             <ul className = 'left-align'>
//             <li><Link to='/'>Home</Link></li>
//             <li onClick = {this.props.resetUpdatePasswordState} ><Link to='/updatePW' >Update Password</Link></li>
                
              
//             </ul>
//             </div>
//             <div className = 'col m6 headerBar'>
             
//                  <h5>Header Header Header</h5>
             
//              </div>
//              <div className= 'col m3'>
//             <div className = 'right-align'>
//                 <button className='btn right-align newMealButton' onClick = {this.props.logOut}><Link to = '/' className = 'linkDark'>Log Out</Link></button>
//                 </div>
//                 </div>
//                 </div>
//         </nav>