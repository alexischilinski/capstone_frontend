import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";

export const PrivateRoute = (props) => {
  return (
    <Route
      {...props}
      render={() => {
        return localStorage.token ? (
          <Home
            onClick={props.exitNav}
            incomingMessages={props.incomingMessages}
            outgoingMessages={props.outgoingMessages}
            toggleLogin={props.toggleLogin}
            addUserRace={props.addUserRace}
            userRaces={props.userRaces}
            signUp={props.signUp}
            logIn={props.logIn}
            photos={props.photos}
            addPhoto={props.addPhoto}
            updatePhoto={props.updatePhoto}
            user={props.user}
            friends={props.friends}
          />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};
