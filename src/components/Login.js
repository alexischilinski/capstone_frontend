import React, { Component } from 'react'
import Form from './Form'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

class Login extends Component {

    state = {
        isNav: false,
        loggedin: false,
        error: false,
        error_message: ""
        }

    signUp = (user, history) => {
        fetch('https://capstone-ontrack.herokuapp.com/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        }).then(response=>response.json())
        .then(result=>{
            if(result["username"] == "This field may not be blank."){
                if(result["password"] == "This field may not be blank."){
                    this.setState({
                        error: true,
                        error_message: `USERNAME: ${result["username"]} PASSWORD: ${result["password"]}`
                    })
                    // alert(`USERNAME: ${result["username"]}, PASSWORD: ${result["password"]}`)
                    // history.push('/')
                }else {
                    this.setState({
                        error: true,
                        error_message: `USERNAME: ${result["username"]}`
                    })
                }
                // alert(`USERNAME: ${result["username"]}`)
                // history.push('/')
            }else if(result["password"] == "This field may not be blank."){
                if(result["username"] == "This field may not be blank."){
                    this.setState({
                        error: true,
                        error_message: `USERNAME: ${result["username"]} PASSWORD: ${result["password"]}`
                    })
                    // alert(`USERNAME: ${result["username"]}, PASSWORD: ${result["password"]}`)
                    // history.push('/')
                }else {
                    this.setState({
                        error: true,
                        error_message: `PASSWORD: ${result["password"]}`
                    })
                }
                // alert(`PASSWORD: ${result["username"]}`)
                // history.push('/')
            }else if(result["username"] == "A user with that username already exists."){
                this.setState({
                    error: true,
                    error_message: result["username"]
                })
                // alert(result["username"])
                // history.push('/')
            }else if(result["username"] != "This field may not be blank."){
                if(result["password"] != "This field may not be blank."){
                    localStorage.setItem('user', result.user.id)
                    localStorage.setItem('token', result.token)
                    localStorage.setItem('username', result.user.username)
                    this.props.toggleLogin()
                    this.setState({
                        loggedin: true,
                        user: result
                    })
                    this.props.fetchMessages()
                    this.props.addNewUser(result.user)
                    history.push('/')
                    }
                }else if(result["password"] == "This field may not be blank."){
                    this.setState({
                        error: true,
                        error_message: result["password"]
                    })
                    // alert(result["password"])
                }
            })
            // .then((result) => {
            //     localStorage.setItem('user', result.user.id)
            //     localStorage.setItem('token', result.token)
            //     localStorage.setItem('username', result.user.username)
            // })
            // .then(()=>{this.props.toggleLogin()
            //     this.setState({
            //         loggedin: true,
            //     })
            //     history.push('/')
            // })
    }

    logIn = (user, history) => {

        fetch('https://capstone-ontrack.herokuapp.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        }).then(response=>response.json())
        .then(result=>{
            if(result["non_field_errors"]){
                this.setState({
                    error: true,
                    error_message: result["non_field_errors"]
                })
                // alert(result["non_field_errors"])
                // history.push('/')
            }else if(!result["non_field_errors"]){
                localStorage.setItem('user', result.user.id)
                localStorage.setItem('token', result.token)
                localStorage.setItem('username', result.user.username)
                this.props.toggleLogin()
                this.props.fetchMessages()
                this.setState({
                    loggedin: true,
                    user: result
                })
                this.props.fetchMessages()
                history.push('/')
            }
        })
            // .then((result) => {
            //     localStorage.setItem('user', result.user.id)
            //     localStorage.setItem('token', result.token)
            //     localStorage.setItem('username', result.user.username)
            // })
            // .then(()=>{this.props.toggleLogin()
            //     this.setState({
            //         loggedin: true,
            //     })
            //     history.push('/')
            // })
    }

    showComponent = () => {
        if(!localStorage.token && !this.state.loggedin){
            return [
                <div className="description">
                    <p className="prompt-first">Welcome to OnTrack</p>
                    <p className="prompt">a training schedule management app</p>
                    <br></br>
                    <p className="prompt">If you need a better tactic for keeping yourself</p>
                    <p className="prompt">accountable while training for a race,</p>
                    <p className="prompt">you've come to the right place!</p>
                    <br></br>
                    <p className="prompt">Once registered, you will be able to:</p>
                    <ul>
                        <li>Choose a pre-made training schedule for a 5k, 10k, half or full marathon</li>
                        <li>Update the schedule when you complete a workout</li>
                        <li>Follow other runners, view their progress, exchange messages</li>
                        <li>Find others running the same race as you</li>
                    </ul>
                </div>,
                <div>
                    <p className="prompt-auth">Sign up or login to get started:</p>
                    <Form history={this.props.history} loginreg={true} signUp={this.signUp} logIn={this.logIn}/>
                    {this.state.error ? <p className="error">{this.state.error_message}</p> : null}
                </div>
            ]
        }else return null
    }

    render(){
        return(
            <div className="login-page-div">
                    {this.showComponent()}
            </div>
        )
    }
}

export default Login;