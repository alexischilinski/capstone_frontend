import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export const DayShowPage = (props) => {
  const weekObject = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };
  const thisWorkout = props.activities.filter(
    (activity) => activity["id"] === parseInt(props.match.params.id)
  );
  const userWorkouts = props.workouts.filter(
    (workout) => workout["user"] === parseInt(localStorage.user)
  );

  const thisRace = () => {
    if (thisWorkout) {
      const thisRace = props.userRaces.filter(
        (userRace) =>
          userRace["user"] === parseInt(localStorage.user) &&
          userRace["distance"].includes(thisWorkout[0]["race"]) &&
          !userRace["completed"]
      );
      return thisRace;
    }
  };

  const showWorkout = () => {
    if (thisWorkout[0]) {
      if (thisWorkout[0]["workout_type"] === "run") {
        return [
          <h2>
            Week {thisWorkout[0]["week"]}, {weekObject[thisWorkout[0]["day"]]}
          </h2>,
          <h1>{thisWorkout[0]["distance"]}</h1>,
        ];
      } else
        return [
          <h2>
            Week {thisWorkout[0]["week"]}, {weekObject[thisWorkout[0]["day"]]}
          </h2>,
          <h1>{thisWorkout[0]["workout_type"]}</h1>,
          <h1>{thisWorkout[0]["distance"]}</h1>,
        ];
    }
  };

  const showWorkoutOrForm = () => {
    if (thisRace().length > 0) {
      if (userWorkouts.length > 0) {
        if (thisRace()) {
          const userWorkout = userWorkouts.filter(
            (workout) =>
              workout["week"] === thisWorkout[0]["week"] &&
              workout["day"] === thisWorkout[0]["day"] &&
              workout["race_name"] == thisRace()[0]["race_name"]
          );
          if (userWorkout.length > 0) {
            return [
              <h2 className="completed-workout">Completed Workout</h2>,
              <h1>Workout Type: {userWorkout[0]["workout_type"]}</h1>,
              userWorkout[0]["distance"] ? (
                <h1>Distance: {userWorkout[0]["distance"]}</h1>
              ) : null,
              userWorkout[0]["pace"] ? (
                <h1>Average pace per mile: {userWorkout[0]["pace"]}</h1>
              ) : null,
              <h1>Duration: {userWorkout[0]["duration"]}</h1>,
              <h1>Location: {userWorkout[0]["location"]}</h1>,
            ];
          } else {
            return [
              <h2>Completed this workout?</h2>,
              <Form
                workout={true}
                race_name={thisRace()[0]["race_name"]}
                addWorkout={props.addWorkout}
                week={thisWorkout[0]["week"]}
                day={thisWorkout[0]["day"]}
                race={thisWorkout[0]["race"]}
              />,
            ];
          }
        }
      } else {
        return [
          <h2>Completed this workout?</h2>,
          <Form
            workout={true}
            race_name={thisRace()[0]["race_name"]}
            addWorkout={props.addWorkout}
            week={thisWorkout[0]["week"]}
            day={thisWorkout[0]["day"]}
            race={thisWorkout[0]["race"]}
          />,
        ];
      }
    }
  };

  return (
    <>
      {localStorage.token ? (
        <>
          <Link to="/calendar">
            <p className="goback">Go Back</p>
          </Link>
          <div className="dayshow">
            <div className="dayinfo">{showWorkout()}</div>
            {thisWorkout[0] && thisWorkout[0]["workout_type"] !== "rest" ? (
              <div className="dayinfo update-workout">
                {showWorkoutOrForm()}
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
};
