import React, { Component } from 'react'
import Form from './Form'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

class Login extends Component {

    state = {
        isNav: false,
        loggedin: false,
        }

    signUp = (user) => {
        fetch('http://localhost:8000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        }).then(response=>response.json())
            .then((result) => {
                localStorage.setItem('user', result.user.id)
                localStorage.setItem('token', result.token)
            })
            this.props.toggleLogin()
            this.setState({
            loggedin: true,
        })
    }

    logIn = (user, history) => {

        fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        }).then(response=>response.json())
            .then((result) => {
                localStorage.setItem('user', result.user.id)
                localStorage.setItem('token', result.token)
                history.push('/')
            })
            this.props.toggleLogin()
            this.setState({
            loggedin: true,
        })
    }

    showComponent = () => {
        if(!localStorage.token && !this.state.loggedin){
            return [
                <p className="prompt-first">Welcome to OnTrack</p>,
                <p className="prompt">a training schedule management app</p>,
                <p className="prompt-auth">Sign up or login to get started:</p>,
                <Form history={this.props.history} loginreg={true} signUp={this.signUp} logIn={this.logIn}/>
            ]
        }else return null
    }

    render(){
        return(
            <div>
            {this.showComponent()}
            </div>
        )
    }
}

export default Login;