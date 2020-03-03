import React, { Component } from 'react'
import Form from './Form'

class Modal extends Component {

    state = {
        sent: false,
        replyForm: false,
    }

    handleClick = () => {
        this.setState({
            replyForm: true
        })
    }

    toggleSent = () => {
        this.setState({
            sent: true
        })
    }

    showModal = () => {
        if(this.props.sendMessage){
            if(!this.state.sent){
                return [<h1>Message to {this.props.friend["first_name"]}</h1>,
                    <Form message={true} friend={this.props.friend} toggleSent={this.toggleSent} sendMessage={this.props.sendMessage}/>
                ]
            }else return <h1>Message sent!</h1>
        }else if(this.props.showPreview){
            if(!this.state.sent){
                if(!this.state.replyForm){
                    if(!this.props.outgoing){
                        return [<p>{this.props.message}</p>,
                            <button onClick={this.handleClick} className="reply">Reply</button>
                        ]
                    }else return <p>{this.props.message}</p>
                }else return <Form reply={true} toggleSent={this.toggleSent} reply={this.props.reply} recipient={this.props.recipient} subject={this.props.subject}/>
            }else return <h1>Message sent!</h1>
        }
    }

    render(){
        return (
            <div className={this.props.show ? "modal show-modal" : "modal"}>
                <div className="modal-content">
                <button onClick={this.props.handleClick} className="close-button">X</button>
                {this.showModal()}
                </div>
            </div>
        )
    }
}

export default Modal