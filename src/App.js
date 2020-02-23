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


class App extends Component {

  state = {
    isNav: false,
    loggedin: false,
    activities: [],
    workouts: []
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


  render(){
    return (
      <Router>
        <div className="App">
          <Header toggleNav={this.toggleNav} loggedin={this.state.loggedin}/>

          <Navbar toggleNav={this.toggleNav} logOut={this.logOut} class={this.state.isNav}/>
          
          <Route exact path="/" render={()=><Home onClick={this.exitNav}  toggleLogin={this.toggleLogin}/>}/>
          <Route exact path="/calendar" render={(props)=><CalendarPage activities={this.state.activities} workouts={this.state.workouts}/>}/>
          <Route exact path="/friends" render={(props)=><Friends/>}/>
          <Route exact path="/day/:id" render={(props)=><DayShowPage {...props} activities={this.state.activities} workouts={this.state.workouts}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
