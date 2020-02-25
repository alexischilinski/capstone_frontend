import React, { Component } from 'react'
import Day from './Day'

class FiveK extends Component {

    showDayNames = () => {
        const dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        return dayArray.map(day=>{
            return <div className="dayname">{day}</div>
        })
    }

    showWeek = (number) => {
        const halfActivities = this.props.activities.filter(activity=>activity["race"] === "5k")
        const filteredAct = halfActivities.filter(activity=>activity["week"] === number)
        const userWorkouts = this.props.workouts.filter(workout=>workout["user"] == localStorage.user && workout["week"] == number && workout["race"] === "5k")
        return filteredAct.map(activity=>{
            if(userWorkouts.length > 0){
                const thisUserWorkout = userWorkouts.filter(user=>user["day"] == activity["day"])
                if(thisUserWorkout.length > 0){
                    return <Day workout={activity} userworkout={thisUserWorkout[0]} />
                }else return <Day workout={activity}/>
            }else return <Day workout={activity}/>
        })
    }

    userWorkouts = (number) => {
        const userWorkouts = this.props.workouts.filter(workout=>workout["user"] == localStorage.user && workout["week"] == number)
        return userWorkouts
    }


    render(){
        return(
            <div className="race">
                <div className="week">
                    <div className="space"></div>
                    {this.showDayNames()}
                </div>
                <div className="week">
                    <div className="space">Week 1</div>
                    {this.showWeek(1)}
                </div>
                <div className="week">
                    <div className="space">Week 2</div>
                    {this.showWeek(2)}
                </div>
                <div className="week">
                    <div className="space">Week 3</div>
                    {this.showWeek(3)}
                </div>
                <div className="week">
                    <div className="space">Week 4</div>
                    {this.showWeek(4)}
                </div>
                <div className="week">
                    <div className="space">Week 5</div>
                    {this.showWeek(5)}
                </div>
                <div className="week">
                    <div className="space">Week 6</div>
                    {this.showWeek(6)}
                </div>
            </div>
        )
    }
}

export default FiveK;