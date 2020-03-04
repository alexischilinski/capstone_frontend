import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Modal from './Modal'

class Messages extends Component{

    state = {
        showMessage: false,
        outgoing: false,
        message: [],
        recipient: [],
        subject: "Reply"
    }
    
    handleClick = (event) => {
        if(event.target.className === "read"){
            this.setState({
                outgoing: false,
                showMessage: true,
                message: event.target.value,
                recipient: event.target.name
            })
            this.props.readMessage(event.target.id)
        }else if(event.target.className === "close-button"){
            this.setState({
                showMessage: false
            })
        }else if(event.target.className === "outgoing-read"){
            this.setState({
                showMessage: true,
                message: event.target.value,
                outgoing: true
            })
        }
    }

    sortDate = (a, b) => {
        if (a.created_at < b.created_at){return -1}
        else if (a.created_at > b.created_at){return 1}
        else {return 0}
    }

    showInbox = () => {
        return this.props.incomingMessages.sort(this.sortDate).map(incomingMessage=>{
            if(incomingMessage["read"]){
                const messageSender = this.props.users.find(user=>user["id"] == incomingMessage["sender"])
                if(typeof messageSender !== "undefined"){
                    return <div className="message-div">
                        <p className="read-message">{messageSender["first_name"]} {messageSender["last_name"]}</p>
                        <p className="read-message">{incomingMessage["subject"]}</p>
                        <button onClick={this.handleClick} name={messageSender["id"]} id={incomingMessage["id"]} className="read" value={incomingMessage["message"]}>Read</button>
                    </div>
                }
            }else {
                const messageSender = this.props.users.find(user=>user["id"] == incomingMessage["sender"])
                if(typeof messageSender != "undefined"){
                    return <div className="message-div">
                        <p className="unread-message">{messageSender["first_name"]} {messageSender["last_name"]}</p>
                        <p className="unread-message">{incomingMessage["subject"]}</p>
                        <button onClick={this.handleClick} name={messageSender["id"]} id={incomingMessage["id"]} className="read" value={incomingMessage["message"]}>Read</button>
                    </div>
                }
            }
        })
    }

    showOutbox = () => {
        return this.props.outgoingMessages.sort(this.sortDate).map(outgoingMessage=>{
            const messageRecipient = this.props.users.find(user=>user["id"] == outgoingMessage["receiver"])
            if(typeof messageRecipient != "undefined"){
                return <div className="message-div">
                <p className="unread-message">{messageRecipient["first_name"]} {messageRecipient["last_name"]}</p>
                <p className="unread-message">{outgoingMessage["subject"]}</p>
                <button onClick={this.handleClick} id={outgoingMessage["id"]} className="outgoing-read" value={outgoingMessage["message"]}>Read</button>
            </div>
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
                        <div className="headings"><h2>Recipient</h2><h2>Subject</h2><div className="headings-space"></div></div>
                        {this.showOutbox()}
                    </div>
                </div>
                <Modal showPreview={true} show={this.state.showMessage} subject={this.state.subject} message={this.state.message} recipient={this.state.recipient} handleClick={this.handleClick} outgoing={this.state.outgoing} reply={this.props.reply}/>
                {/* <div className="show-message">
                    {this.state.showMessage ? <p>{this.state.message}</p> : null}
                </div> */}
            </>
        )
    }
}

export default Messages;