import React, { Component } from 'react'
import Day from './Day'

class TenK extends Component {

    showDayNames = () => {
        const dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        return dayArray.map(day=>{
            return <div className="dayname">{day}</div>
        })
    }

    showWeek = (number) => {
        const halfActivities = this.props.activities.filter(activity=>activity["race"] === "10k")
        const filteredAct = halfActivities.filter(activity=>activity["week"] === number)
        const userWorkouts = this.props.workouts.filter(workout=>workout["user"] == localStorage.user && workout["week"] == number && workout["race"] === "10k")
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

    showDays = () => {
        const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        return numberArray.map(number=>{
            return <div className="week">
                        <div className="space">Week {number}</div>
                        {this.showWeek(number)}
                    </div>
        })
    }

    showUserWeek = (id, number) => {
        const halfActivities = this.props.activities.filter(activity=>activity["race"] === "10k")
        const filteredAct = halfActivities.filter(activity=>activity["week"] === number)
        const userWorkouts = this.props.workouts.filter(workout=>workout["user"] == id && workout["week"] == number && workout["race"] === "10k")
        return filteredAct.map(activity=>{
            if(userWorkouts.length > 0){
                const thisUserWorkout = userWorkouts.filter(user=>user["day"] == activity["day"])
                if(thisUserWorkout.length > 0){
                    return <Day friend={true} workout={activity} userworkout={thisUserWorkout[0]} />
                }else return <Day friend={true} workout={activity}/>
            }else return <Day friend={true} workout={activity}/>
        })
    }

    showUserDays = () => {
        const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        return numberArray.map(number=>{
            return <div className="user-week">
                        <div className="user-space">Week {number}</div>
                        {this.showUserWeek(this.props.thisFriend, number)}
                    </div>
        })
    }


    render(){
        return(
            <>
            {!this.props.friend ?
                <div className="race">
                    <h1>10k Training Schedule</h1>
                    <div className="week">
                        <div className="space"></div>
                        {this.showDayNames()}
                    </div>
                    {this.showDays()}
                </div>
            : null}
            {this.props.friend ?
                <div className="user-race">
                    <div className="user-week">
                        <div className="dayname-space"></div>
                        {this.showDayNames()}
                    </div>
                    {this.showUserDays()}
                </div>
            : null}
            </>
        )
    }
}

export default TenK;