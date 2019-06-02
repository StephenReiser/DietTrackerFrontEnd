import React, { Component } from 'react'

class Navbar extends Component {
render() {
    return (
        <nav>
            <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/signup'>Sign Up</a></li>
                <li><a href='/login'>Log In</a></li>
            </ul>
        </nav>
    )
}
}
export default Navbar