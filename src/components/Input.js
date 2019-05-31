import React, { Component } from 'react'


class Input extends Component {
    render() {
        return(
            <>
            <div className = {this.props.type == "textarea" ? "materialize-textarea" : ''}>
                {/* <h5>stuff</h5> */}
            <label htmlFor={this.props.name}>{this.props.name}</label>
            <input
              id={this.props.name}
              name={this.props.name}
            //   type={this.props.type}
              value={this.props.value}
              onChange={this.props.handleChange}
              placeholder={this.props.placeholder}
            />
            </div>
            </>
        )
    }

}
export default Input