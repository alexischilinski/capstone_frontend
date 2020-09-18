import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Day extends Component {

    state = {
        week: this.props.workout.week,
        day: this.props.workout.day,
        race: this.props.workout.race,
        id: this.props.workout.id
    }

    render(){
        return(
            <>
            {!this.props.friend ?
                <Link race_name={this.props.race_name} style={{color: 'black', textDecoration: 'none'}} to={`/day/${this.state.id}`}>
                    <div className={this.props.userworkout ? "day completed" : "day"}>
                        <h3>{this.props.workout.distance}</h3>
                        {this.props.workout.workout_type !== "run" ? <h3>{this.props.workout.workout_type}</h3> : null}
                    </div>
                </Link>
            : null}
            {this.props.friend ?
                <div className={this.props.userworkout ? "day completed" : "day"}>
                    <h3>{this.props.workout.distance}</h3>
                    {this.props.workout.workout_type !== "run" ? <h3>{this.props.workout.workout_type}</h3> : null}
                </div>
            : null}
            </>
        )
    }
}

export default Day;