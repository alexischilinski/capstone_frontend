import React, { Component } from 'react'

class Form extends Component {

    state = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        login: true,
        distance: "",
        race_name: "",
        workout_type: "",
        pace: "",
        duration: "",
        location: "",
        race: this.props.race,
        week: this.props.week,
        day: this.props.day,
        photo: ""
    }

    handleChange = (event) => (
        this.setState({
            [event.target.name]: event.target.value
        })
    )

    handleClick = (event) => {
        if(event.target.className === "form-button"){
            this.setState({
                login: !this.state.login
            })
        }if(event.target.className === "race-button"){
            event.preventDefault()
            this.setState({
                distance: event.target.value
            })
        }
    }

    handleSubmit = (event) => {
        if(event.target.className === "signup"){
            event.preventDefault()
            const {first_name, last_name, username, email, password} = this.state
            this.props.signUp({first_name, last_name, username, email, password}, this.props.history)
        }else if(event.target.className === "login"){
            event.preventDefault()
            const {username, password} = this.state 
            this.props.logIn({username, password}, this.props.history)
        }else if(event.target.className === "add-workout"){
            event.preventDefault()
            const {race, week, day, workout_type, pace, duration, location} = this.state
            this.props.addWorkout({race, week, day, workout_type, pace, duration, location})
        }else if(event.target.className === "distances"){
            event.preventDefault()
            const {race_name, distance} = this.state
            this.props.addUserRace({race_name, distance})
        }else if(event.target.className === "add-photo"){
            const {photo} = this.state
            event.preventDefault()
            this.props.addPhoto({photo})
            this.setState({
                photo: ""
            })
        }
    }

    showForm = () => {
        if(this.props.loginreg){
            if(this.state.login){
                    return <form onSubmit={this.handleSubmit} className="login">
                        <input onChange={this.handleChange} className="login-input" type="text" placeholder="username" name="username" value={this.state.username}></input>
                        <input onChange={this.handleChange} className="login-input" type="password" placeholder="password" name="password" value={this.state.password}></input>
                        <input className="login-button" type="submit" value="Login"></input>
                        <p className="account">Don't have an account?</p>
                        <button onClick={this.handleClick} className="form-button">Register</button>
                    </form>
            }else if (!this.state.login){
                    return <form onSubmit={this.handleSubmit} className="signup">
                        <input onChange={this.handleChange} className="signup-input" type="text" placeholder="first name" name="first_name" value={this.state.first_name}></input>
                        <input onChange={this.handleChange} className="signup-input" type="text" placeholder="last name" name="last_name" value={this.state.last_name}></input>
                        <input onChange={this.handleChange} className="signup-input" type="text" placeholder="username" name="username" value={this.state.username}></input>
                        <input onChange={this.handleChange} className="signup-input" type="text" placeholder="email" name="email" value={this.state.email}></input>
                        <input onChange={this.handleChange} className="signup-input" type="password" placeholder="password" name="password" value={this.state.password}></input>
                        <input className="signup-button" type="submit" value="Register"></input>
                        <p className="account">Already have an account?</p>
                        <button onClick={this.handleClick} className="form-button">Login</button>
                    </form>
            }
        }else if(this.props.race_type){
            return <div>
                    <form onSubmit={this.handleSubmit} className="distances">
                        <div className="race-div">
                            <button onClick={this.handleClick} className="race-button" value="5k">5k</button>
                            <button onClick={this.handleClick} className="race-button" value="10k">10k</button>
                            <button onClick={this.handleClick} className="race-button" value="half marathon">Half Marathon</button>
                            <button onClick={this.handleClick} className="race-button" value="full marathon">Full Marathon</button>
                        </div>
                        <div className="submit-div">
                            <input onChange={this.handleChange} className="race-name-input" type="text" placeholder="enter race name" name="race_name"></input>
                            <input className="submit-race" type="submit" value="Submit"></input>
                        </div>
                    </form>
                </div>
        }else if(this.props.workout){
            return <div>
                    <form onSubmit={this.handleSubmit} className="add-workout">
                        <input onChange={this.handleChange} className="workout-input" type="text" placeholder="workout type (run, bike, etc)" name="workout_type"></input>
                        <input onChange={this.handleChange} className="workout-input" type="text" placeholder="pace (00:00)" name="pace"></input>
                        <input onChange={this.handleChange} className="workout-input" type="text" placeholder="duration (00:00:00)" name="duration"></input>
                        <input onChange={this.handleChange} className="workout-input" type="text" placeholder="location (Boston, Denver, etc)" name="location"></input>
                        <input className="workout-submit" type="submit" value="Complete Workout"></input>
                    </form>
                </div>
        }else if(this.props.photo){
            return <form onSubmit={this.handleSubmit} className="add-photo">
                    <input onChange={this.handleChange} className="photo-input" type="text" name="photo" value={this.state.photo}></input>
                    <input className="photo-submit" type="submit" value="add photo"></input>
                </form>
        }
    }

    render(){
        return(
            <>
                {this.showForm()}
            </>
        )
    }
}

export default Form;