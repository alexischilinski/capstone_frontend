import React, { Component } from 'react';
import './App.css';
import {Header} from './components/Header'
import {Navbar} from './components/Navbar'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'
import CalendarPage from './components/CalendarPage';
import {Friends} from './components/Friends'
import {DayShowPage} from './components/DayShowPage'
import Login from './components/Login'
import {PrivateRoute} from './components/PrivateRoute'
import {Friend} from './components/FriendShowPage'
import Messages from './components/Messages'


const baseURL = 'https://capstone-ontrack.herokuapp.com/api/'
const activitiesURL = 'activities/'
const workoutsURL = 'workouts/'
const schedulesURL = 'schedules/'
const usersURL = 'users/'
const friendsURL = 'friends/'
const photosURL = 'photos/'
const incomingMessagesURL = 'incoming/'
const outgoingMessagesURL = 'outgoing/'
const logoutURL = 'auth/logout'
const addWorkoutURL = 'crudworkouts/'
const editScheduleURL = 'crudschedules/'
const followingURL = 'following/'
const editPhotosURL = 'crudphotos/'

const parseJSON = (response) => {
  return response.json()
}

const getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json', 
    'Authorization': `Token ${localStorage.token}`
  }
}

class App extends Component {

  state = {
    isNav: false,
    loggedin: false,
    activities: [],
    workouts: [],
    userRaces: [],
    users: [],
    friends: [],
    photos: [],
    incomingMessages: [],
    outgoingMessages: []
  }

  componentDidMount(){
    this.fetchData()
  }

  goFetch = (url, stateName) => {
    fetch(baseURL + url)
      .then(parseJSON)
      .then(data=>this.setState({[stateName]: data}))
  }

  postFetch = (url, data, stateName) => {
    fetch(baseURL + url, {
      method: "POST",
      headers: getAuthHeaders(),
      body:JSON.stringify(data)
    }).then(parseJSON)
    .then(result =>
      this.setState({
        [stateName]: [...this.state[stateName], result]
      })
    )
  }

  fetchWithHeaders = (url, stateName) => {
    fetch(baseURL + url, {
      headers: getAuthHeaders()
  }).then(response => response.json())
    .then(data =>
      this.setState({[stateName]: data})
    )
  }

  fetchData = () => {
    this.goFetch(activitiesURL, 'activities')
    this.goFetch(workoutsURL, 'workouts')
    this.goFetch(schedulesURL, 'userRaces')
    this.goFetch(usersURL, 'users')
    this.goFetch(friendsURL, 'friends')
    this.goFetch(photosURL, 'photos')
    this.fetchWithHeaders(incomingMessagesURL, 'incomingMessages')
    this.fetchWithHeaders(outgoingMessagesURL, 'outgoingMessages')
  }

  fetchMessages = () => {
    this.fetchWithHeaders(incomingMessagesURL, 'incomingMessages')
    this.fetchWithHeaders(outgoingMessagesURL, 'outgoingMessages')
  }

  readMessage = (id) => {
    fetch(baseURL + incomingMessagesURL + id + '/', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body:JSON.stringify({read: true})
  }).then(parseJSON)
  .then(result => {
    const newMessages = this.state.incomingMessages.filter(message =>
      message["id"] !== result["id"]
    )
    this.setState({
      incomingMessages: [...newMessages, result]
    })
  })
  }

  sendMessage = (message) => {
    this.postFetch(outgoingMessagesURL, message, 'outgoingMessages')
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
      loggedin: !this.state.loggedin
    })
  }

  logOut = () => {
    fetch(baseURL + logoutURL, {
      method: 'POST',
      headers: getAuthHeaders()
    })
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('username')
    this.setState({
      isNav: false,
      loggedin: false,
      activities: [],
      workouts: [],
      userRaces: [],
      users: [],
      friends: [],
      photos: [],
      incomingMessages: [],
      outgoingMessages: []
    })
  }

  addWorkout = (workout) => {
    this.postFetch(addWorkoutURL, workout, 'workouts')
  }

  addUserRace = (userRace) => {
    this.postFetch(editScheduleURL, userRace, 'userRaces')
  }

  followUser = (userid) => {
    fetch(baseURL + followingURL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body:JSON.stringify({
        follower: localStorage.user,
        following: userid
      })
    }).then(parseJSON)
    .then(newFollow =>
      this.setState({
        friends: [...this.state.friends, newFollow]
      })
    )
  }

  unfollowUser = (id) => {
    fetch(baseURL + followingURL + id, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    const newFriends = this.state.friends.filter(friend => 
      friend["id"] != id
    )
    this.setState({friends: newFriends})
  }

  addNewUser = (user) => {
    this.setState({
      users: [...this.state.users, user]
    })
  }

  addPhoto = (photo) => {
    this.postFetch(editPhotosURL, photo, 'photos')
  }

  updatePhoto = (id, photo) => {
    fetch(`${baseURL}${editPhotosURL}${id}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body:JSON.stringify({photo})
    }).then(parseJSON)
    .then(result=>{
      const newPhotos = this.state.photos.filter(photo =>
        photo["user"] != result["id"]
      )
      this.setState({
        photos: [...newPhotos, result]
      })
    })
  }

  completeRace = (id, completed, history) => {
    fetch(`${baseURL}${editScheduleURL}${id}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body:JSON.stringify({completed})
    }).then(parseJSON)
    .then(result=>{
      const newRaces = this.state.userRaces.filter(userRace =>
        userRace["id"] != result["id"]
      )
      this.setState({
        userRaces: [...newRaces, result]
      })
      history.push('/')
    })
  }


  render(){
    return (
        <div className="App">
          <Header 
            toggleNav={this.toggleNav}
            class={this.state.isNav}
            loggedin={this.state.loggedin}
            />
          <Navbar
            toggleNav={this.toggleNav}
            logOut={this.logOut}
            class={this.state.isNav}
            />
          <Route 
            exact path="/login"
            render={(props)=>
            <Login {...props}
              onClick={this.exitNav} 
              addNewUser={this.addNewUser}
              toggleLogin={this.toggleLogin}
              fetchMessages={this.fetchMessages}
              userRaces={this.state.userRaces}
              signUp={this.signUp}
              logIn={this.logIn}
              fetchData={this.fetchData}
              />}
            />
          <PrivateRoute 
            exact path="/" 
            onClick={this.exitNav}
            incomingMessages={this.state.incomingMessages}
            outgoingMessages={this.state.outgoingMessages}
            toggleLogin={this.toggleLogin}
            addUserRace={this.addUserRace}
            userRaces={this.state.userRaces.filter(userRace =>
              userRace["user"] == localStorage.user
            )}
            signUp={this.signUp}
            logIn={this.logIn}
            photos={this.state.photos.find(photo =>
              photo["user"] == localStorage.user
            )}
            addPhoto={this.addPhoto}
            updatePhoto={this.updatePhoto}
            user={this.state.users.find(user =>
              user["id"] == localStorage.user
            )}
            friends={this.state.friends}
          />
          <Route
            exact path="/calendar"
            render={(props) =>
            <CalendarPage {...props}
              activities={this.state.activities}
              workouts={this.state.workouts}
              userRaces={this.state.userRaces.filter(userRace =>
                userRace["user"] == localStorage.user
              )}
              completeRace={this.completeRace}
            />}
          />
          <Route
            exact path="/friends"
            render={(props) =>
            <Friends {...props}
              activities ={this.state.activities}
              unFollow={this.unfollowUser}
              workouts={this.state.workouts}
              userRaces={this.state.userRaces}
              photos={this.state.photos}
              users={this.state.users}
              friends={this.state.friends}
              followUser={this.followUser}
            />}
          />
          <Route
            exact path="/friends/:id"
            render={(props) =>
            <Friend {...props}
              activities ={this.state.activities}
              workouts={this.state.workouts} 
              photos={this.state.photos} 
              users={this.state.users} 
              friends={this.state.friends} 
              sendMessage={this.sendMessage}
              followUser={this.followUser} 
              userRaces={this.state.userRaces}
            />}
          />
          <Route
            exact path="/day/:id"
            render={(props) =>
            <DayShowPage {...props}
              activities={this.state.activities} 
              workouts={this.state.workouts}
              userRaces={this.state.userRaces}
              addWorkout={this.addWorkout}
            />}
          />
          <Route
            exact path="/messages/:id"
            render={(props) =>
            <Messages {...props}
              incomingMessages={this.state.incomingMessages}
              outgoingMessages={this.state.outgoingMessages}
              users={this.state.users}
              readMessage={this.readMessage}
              reply={this.sendMessage}
            />}
          />
        </div>
    );
  }
}

export default App;
