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


class App extends Component {

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

  toggleNav = () => {
    this.setState({
      isNav: !this.state.isNav
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
          
          <Route exact path="/" render={()=><Home toggleLogin={this.toggleLogin}/>}/>
          <Route exact path="/calendar" render={()=><CalendarPage/>}/>
          <Route exact path="/friends" render={()=><Friends/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
