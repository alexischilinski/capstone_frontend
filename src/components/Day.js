import React, { Component } from "react";
import { Link } from "react-router-dom";

class Day extends Component {
  state = {
    week: this.props.workout.week,
    day: this.props.workout.day,
    race: this.props.workout.race,
    id: this.props.workout.id,
  };

  // handleClick = () => {
  //     console.log("week", this.state.week)
  //     console.log("day", this.state.day)
  // }

  render() {
    return (
      <>
        {!this.props.friend ? (
          <Link
            race_name={this.props.race_name}
            style={{ color: "black", textDecoration: "none" }}
            to={`/day/${this.state.id}`}
          >
            <div className={this.props.userworkout ? "day completed" : "day"}>
              {/* <div className="day"> */}
              <h3>{this.props.workout.distance}</h3>
              {this.props.workout.workout_type !== "run" ? (
                <h3>{this.props.workout.workout_type}</h3>
              ) : null}
              {/* {this.props.userworkout ? <img className="checkmark" src="https://www.freeiconspng.com/uploads/checkmark-symbol-png-background-12.png"></img>: null} */}
            </div>
          </Link>
        ) : null}
        {this.props.friend ? (
          <div className={this.props.userworkout ? "day completed" : "day"}>
            <h3>{this.props.workout.distance}</h3>
            {this.props.workout.workout_type !== "run" ? (
              <h3>{this.props.workout.workout_type}</h3>
            ) : null}
            {/* {this.props.userworkout ? <img className="checkmark" src="https://www.freeiconspng.com/uploads/checkmark-symbol-png-background-12.png"></img>: null} */}
          </div>
        ) : null}
      </>
    );
  }
}

export default Day;
