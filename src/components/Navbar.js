import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class Navbar extends Component {
render() {
    return (
        <nav>
            <div className = 'row'>
                <div className = 'col m3'>
            <ul className = 'left-align'>
            <li><Link to='/'>Home</Link></li>
            <li onClick = {this.props.resetUpdatePasswordState} ><Link to='/updatePW' >Update Password</Link></li>
                
                {/* <li><Link to='/login'>Log In</Link></li> */}
            </ul>
            </div>
            <div className = 'col m6 headerBar'>
             {/* <div className = 'center-align'> */}
                 <h5>Header Header Header</h5>
             {/* </div> */}
             </div>
             <div className= 'col m3'>
            <div className = 'right-align'>
                <button className='btn right-align' onClick = {this.props.logOut}><Link to = '/' >Log Out</Link></button>
                </div>
                </div>
                </div>
        </nav>
    )
}
}
export default Navbar