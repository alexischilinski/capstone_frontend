import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Day extends Component {

    state = {
        week: this.props.workout.week,
        day: this.props.workout.day,
        race: this.props.workout.race,
        id: this.props.workout.id
    }

    // handleClick = () => {
    //     console.log("week", this.state.week)
    //     console.log("day", this.state.day)
    // }

    render(){
        return(
            <Link style={{color: 'black', textDecoration: 'none'}} to={`/day/${this.state.id}`}>
                <div className="day">
                    <h3>{this.props.workout.distance}</h3>
                </div>
            </Link>
        )
    }
}

export default Day;