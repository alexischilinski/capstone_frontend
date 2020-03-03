import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Messages extends Component{

    state = {
        showMessage: false,
        message: []
    }
    
    handleClick = (event) => {
        this.setState({
            showMessage: true,
            message: event.target.value
        })
        this.props.readMessage(event.target.id)
    }

    showInbox = () => {
        return this.props.incomingMessages.map(incomingMessage=>{
            if(incomingMessage["read"]){
                const messageSender = this.props.users.find(user=>user["id"] == incomingMessage["sender"])
                if(typeof messageSender !== "undefined"){
                    return <div className="message-div">
                        <p className="read-message">{messageSender["first_name"]} {messageSender["last_name"]}</p>
                        <p className="read-message">{incomingMessage["subject"]}</p>
                        <button onClick={this.handleClick} id={incomingMessage["id"]} className="read" value={incomingMessage["message"]}>Read</button>
                    </div>
                }
            }else {
                const messageSender = this.props.users.find(user=>user["id"] == incomingMessage["sender"])
                if(typeof messageSender != "undefined"){
                    return <div className="message-div">
                        <p className="unread-message">{messageSender["first_name"]} {messageSender["last_name"]}</p>
                        <p className="unread-message">{incomingMessage["subject"]}</p>
                        <button onClick={this.handleClick} id={incomingMessage["id"]} className="read" value={incomingMessage["message"]}>Read</button>
                    </div>
                }
            }
        })
    }

    render(){
        return (
            <>
            <Link to="/"><button className="go-back">Go Back</button></Link>
                <div className="messages-div">
                    <div className="incoming">
                        <h1>Inbox</h1>
                        <div className="headings"><h2>Sender</h2><h2>Subject</h2><div className="headings-space"></div></div>
                        {this.showInbox()}
                    </div>
                    <div className="outgoing">
                        <h1>Outbox</h1>
                    </div>
                </div>
                <div className="show-message">
                    {this.state.showMessage ? <p>{this.state.message}</p> : null}
                </div>
            </>
        )
    }
}

export default Messages;