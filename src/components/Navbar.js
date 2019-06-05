import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class Navbar extends Component {
render() {
    return (
        <nav>
            <ul>
            <li><Link to='/'>Home</Link></li>
            <li onClick = {this.props.resetUpdatePasswordState} ><Link to='/updatePW' >Update Password</Link></li>
                
                {/* <li><Link to='/login'>Log In</Link></li> */}
            </ul>
             
            <div className = 'right-align'>
                <button className='btn right-align' onClick = {this.props.logOut}><Link to = '/' exact>Log Out</Link></button>
                </div>
                
        </nav>
    )
}
}
export default Navbar