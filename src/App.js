import React, { Component } from 'react';
import './App.css';
import {Header} from './components/Header'
import {Navbar} from './components/Navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import CalendarPage from './components/CalendarPage';
import {Friends} from './components/Friends'
import Home from './components/Home'
import Form from './components/Form'
import HalfMarathon from './components/HalfMarathon';
import {DayShowPage} from './components/DayShowPage'
import Login from './components/Login'
import {PrivateRoute} from './components/PrivateRoute'


class App extends Component {

  state = {
    isNav: false,
    loggedin: false,
    activities: [],
    workouts: [],
    userRaces: []
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

  componentDidMount(){
    fetch('http://localhost:8000/api/activities/')
      .then(response=>response.json())
      .then(activities=>this.setState({activities}))
    fetch('http://localhost:8000/api/workouts')
      .then(response=>response.json())
      .then(workouts=>this.setState({workouts}))
    fetch('http://localhost:8000/api/schedules/')
      .then(response=>response.json())
      .then(userRaces=>this.setState({userRaces}))
  }

  toggleNav = () => {
    this.setState({
      isNav: !this.state.isNav
    })
  }

  exitNav = () => {
    this.setState({
      isNav: false
    })
  }

  toggleLogin = () => {
    this.setState({
      loggedin: true
    })
  }

  logOut = () => {
    fetch('http://localhost:8000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`
      }
    })
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.setState({
      loggedin: false,
    })
  }

  addWorkout = (workout) => {
    fetch('http://localhost:8000/api/cdworkouts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`
      },
      body:JSON.stringify(workout)
    }).then(response=>response.json())
    .then(workout=>this.setState({workouts: [...this.state.workouts, workout]}))
  }

  addUserRace = (userRace) => {
    fetch('http://localhost:8000/api/cdschedules/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`
      },
      body:JSON.stringify(userRace)
    }).then(response=>response.json())
    .then(result=>this.setState({userRaces: [...this.state.userRaces, result]}))
  }


  render(){
    return (
      <Router>
        <div className="App">
          <Header toggleNav={this.toggleNav} loggedin={this.state.loggedin}/>

          <Navbar toggleNav={this.toggleNav} logOut={this.logOut} class={this.state.isNav}/>
          <Route exact path="/login" render={(props)=><Login {...props} onClick={this.exitNav} toggleLogin={this.toggleLogin} userRaces={this.state.userRaces} signUp={this.signUp} logIn={this.logIn}/>}/>
          {/* <Route exact path="/" render={()=><Home onClick={this.exitNav} toggleLogin={this.toggleLogin} addUserRace={this.addUserRace} userRaces={this.state.userRaces} signUp={this.signUp} logIn={this.logIn}/>}/> */}
          <PrivateRoute exact path="/" onClick={this.exitNav}
                                      toggleLogin={this.toggleLogin}
                                      addUserRace={this.addUserRace}
                                      userRaces={this.state.userRaces.filter(userRace=>userRace["user"] == localStorage.user)}
                                      signUp={this.signUp}
                                      logIn={this.logIn}/>
          <Route exact path="/calendar" render={(props)=><CalendarPage {...props} activities={this.state.activities}
                                                                                  workouts={this.state.workouts}
                                                                                  userRaces={this.state.userRaces.filter(userRace=>userRace["user"] == localStorage.user)}/>}/>
          <Route exact path="/friends" render={(props)=><Friends {...props}/>}/>
          <Route exact path="/day/:id" render={(props)=><DayShowPage {...props} activities={this.state.activities} workouts={this.state.workouts} addWorkout={this.addWorkout}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
