import React, { Component } from "react";
import Form from "./Form";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const baseURL = "https://capstone-ontrack.herokuapp.com/api/auth/";
const registerURL = "register";
const loginURL = "login";
const blankMessage = "This field may not be blank.";
const userExists = "A user with that username already exists.";

class Login extends Component {
  state = {
    isNav: false,
    loggedin: false,
    error: false,
    error_message: "",
  };

  signUp = (user, history) => {
    fetch(baseURL + registerURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        if (
          result["username"] &&
          result["username"].toString() === blankMessage
        ) {
          if (
            result["password"] &&
            result["password"].toString() === blankMessage
          ) {
            this.setState({
              error: true,
              error_message: `USERNAME: ${result["username"]} PASSWORD: ${result["password"]}`,
            });
          } else if (!result["password"]) {
            this.setState({
              error: true,
              error_message: `USERNAME: ${result["username"]}`,
            });
          }
        } else if (
          result["password"] &&
          result["password"].toString() === blankMessage
        ) {
          if (
            result["username"] &&
            result["username"].toString() === blankMessage
          ) {
            this.setState({
              error: true,
              error_message: `USERNAME: ${result["username"]}, PASSWORD: ${result["password"]}`,
            });
          } else if (!result["username"]) {
            this.setState({
              error: true,
              error_message: `PASSWORD: ${result["password"]}`,
            });
          }
        } else if (
          result["username"] &&
          result["username"].toString() === userExists
        ) {
          this.setState({
            error: true,
            error_message: result["username"],
          });
        } else if (result["user"]) {
          localStorage.setItem("user", result.user.id);
          localStorage.setItem("token", result.token);
          localStorage.setItem("username", result.user.username);
          this.props.toggleLogin();
          this.setState({
            loggedin: true,
            user: result,
          });
          this.props.addNewUser(result.user);
          this.props.fetchData();
          history.push("/");
        }
      });
  };

  logIn = (user, history) => {
    fetch(baseURL + loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["non_field_errors"]) {
          this.setState({
            error: true,
            error_message: result["non_field_errors"],
          });
        } else if (
          result["username"] &&
          result["username"].toString() === blankMessage
        ) {
          if (
            result["password"] &&
            result["password"].toString() === blankMessage
          ) {
            this.setState({
              error: true,
              error_message: `USERNAME: ${result["username"]} PASSWORD: ${result["password"]}`,
            });
          } else {
            this.setState({
              error: true,
              error_message: `USERNAME: ${result["username"]}`,
            });
          }
        } else if (
          result["password"] &&
          result["password"].toString() === blankMessage
        ) {
          if (
            result["username"] &&
            result["username"].toString() == blankMessage
          ) {
            this.setState({
              error: true,
              error_message: `USERNAME: ${result["username"]} PASSWORD: ${result["password"]}`,
            });
          } else {
            this.setState({
              error: true,
              error_message: `PASSWORD: ${result["password"]}`,
            });
          }
        } else if (result["user"]) {
          localStorage.setItem("user", result.user.id);
          localStorage.setItem("token", result.token);
          localStorage.setItem("username", result.user.username);
          this.props.toggleLogin();
          this.setState({
            loggedin: true,
            user: result,
          });
          this.props.addNewUser(result.user);
          this.props.fetchData();
          history.push("/");
        }
      });
  };

  showComponent = () => {
    if (!localStorage.token && !this.state.loggedin) {
      return [
        <div className="description">
          <p className="prompt-first">Welcome to OnTrack</p>
          <p className="prompt">a training schedule management app</p>
          <br></br>
          <p className="prompt">
            If you need a better tactic for keeping yourself
          </p>
          <p className="prompt">accountable while training for a race,</p>
          <p className="prompt">you've come to the right place!</p>
          <br></br>
          <p className="prompt">Once registered, you will be able to:</p>
          <ul>
            <li>
              Choose a pre-made training schedule for a 5k, 10k, half or full
              marathon
            </li>
            <li>Update the schedule when you complete a workout</li>
            <li>
              Follow other runners, view their progress, exchange messages
            </li>
            <li>Find others running the same race as you</li>
          </ul>
        </div>,
        <div>
          <p className="prompt-auth">Sign up or login to get started:</p>
          <Form
            history={this.props.history}
            loginreg={true}
            signUp={this.signUp}
            logIn={this.logIn}
          />
          {this.state.error ? (
            <p className="error">{this.state.error_message}</p>
          ) : null}
        </div>,
      ];
    } else return null;
  };

  render() {
    return <div className="login-page-div">{this.showComponent()}</div>;
  }
}

export default Login;
