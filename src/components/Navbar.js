import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class Navbar extends Component {
render() {
    return (
        <nav>
            {/* <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
                <li><Link to='/login'>Log In</Link></li>
            </ul> */}
            <div className = 'right-align'>
                <button className='btn right-align' onClick = {this.props.logOut}>Log Out</button>
                </div>
        </nav>
    )
}
}
export default Navbar