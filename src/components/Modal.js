import React, { Component } from 'react'
import Form from './Form'

class Modal extends Component {

    state = {
        sent: false
    }

    toggleSent = () => {
        this.setState({
            sent: true
        })
    }

    render(){
        return (
            <div className={this.props.show ? "modal show-modal" : "modal"}>
                <div className="modal-content">
                <button onClick={this.props.handleClick} className="close-button">X</button>
                {!this.state.sent ?
                    [<h1>Message to {this.props.friend["first_name"]}</h1>,
                    <Form message={true} friend={this.props.friend} toggleSent={this.toggleSent} sendMessage={this.props.sendMessage}/>]
                    : <h1>Message sent!</h1>}
                </div>
            </div>
        )
    }
}

export default Modal