import React, { Component } from 'react'

class Form extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        login: true,
        distance: "",
        workout_type: "",
        pace: "",
        duration: "",
        location: "",
        race: this.props.race,
        week: this.props.week,
        day: this.props.day
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
            const {username, email, password} = this.state
            this.props.signUp({username, email, password})
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
            event.preventDefault()
            const {distance} = this.state
            this.props.toggleNewRace()
            this.props.addUserRace({distance})
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
                    <div>
                        <button onClick={this.handleClick} className="race-button" value="5k">5k</button>
                        <button onClick={this.handleClick} className="race-button" value="10k">10k</button>
                        <button onClick={this.handleClick} className="race-button" value="half marathon">Half Marathon</button>
                        <button onClick={this.handleClick} className="race-button" value="full marathon">Full Marathon</button>
                    </div>
                        <input className="submit-race" type="submit" value="Submit"></input>
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