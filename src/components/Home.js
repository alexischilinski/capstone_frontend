import React, { Component } from 'react'
import Form from './Form'

class Home extends Component {

state = {
    isNav: false,
    loggedin: false,
    }

// componentWillMount(){
//   if(localStorage.token){
//     fetch('http://localhost:8000/api/auth/user', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Token ${localStorage.token}`
//       }
//     })
//   }
// }

signUp = (user) => {
    fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(user)
    }).then(response=>response.json())
        .then((result) => {
            return result.error ? alert(result.error) : localStorage.setItem('user', result.user.id), localStorage.setItem('token', result.token)
        })
        this.props.toggleLogin()
        this.setState({
        loggedin: true,
    })
}

logIn = (user) => {
    fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(user)
    }).then(response=>response.json())
        .then((result) => {
            return result.error ? alert(result.error) : localStorage.setItem('user', result.user.id), localStorage.setItem('token', result.token)
        })
        this.props.toggleLogin()
        this.setState({
        loggedin: true,
    })
}

addRace = (race) => {
    fetch('http://localhost:8000/api/cdschedules/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.token}`
        },
        body:JSON.stringify({user: localStorage.user, distance: race})
    })
}
    render(){
        return(
            <div>
                {localStorage.token || this.state.loggedin ? [
                <p className="prompt">What distance are you training for? (choose one)</p>,
                <Form race={true}/>
                // <HalfMarathon/>
            ] : null}
            
            {!localStorage.token && !this.state.loggedin ? [
                <p className="prompt-first">Welcome to OnTrack</p>,
                <p className="prompt">a training schedule management app</p>,
                <p className="prompt-auth">Sign up or login to get started:</p>,
            <Form loginreg={true} signUp={this.signUp} logIn={this.logIn}/>] : null}
            </div>
        )
    }
}

export default Home;