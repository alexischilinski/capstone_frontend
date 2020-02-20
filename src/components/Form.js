import React, { Component } from 'react'

class Form extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        login: true,
        distance: ""
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
            this.props.logIn({username, password})
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
        }else if(this.props.race){
            return <div>
                    <form className="distances">
                    <button onClick={this.handleClick} className="race-button" value="5k">5k</button>
                    <button onClick={this.handleClick} className="race-button" value="10k">10k</button>
                    <button onClick={this.handleClick} className="race-button" value="half marathon">Half Marathon</button>
                    <button onClick={this.handleClick} className="race-button" value="full marathon">Full Marathon</button>
                    </form>
                    <input className="submit-race" type="submit" value="Submit"></input>
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