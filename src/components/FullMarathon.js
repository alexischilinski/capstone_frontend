import React, { Component } from 'react'
import Day from './Day'

class FullMarathon extends Component {

    showDayNames = () => {
        const dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        return dayArray.map(day=>{
            return <div className="dayname">{day}</div>
        })
    }

    showWeek = (number) => {
        const halfActivities = this.props.activities.filter(activity=>activity["race"] === "full")
        const filteredAct = halfActivities.filter(activity=>activity["week"] === number)
        const userWorkouts = this.props.workouts.filter(workout=>workout["user"] == localStorage.user && workout["week"] == number && workout["race"] === "full")
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
                <div className="week">
                    <div className="space">Week 7</div>
                    {this.showWeek(7)}
                </div>
                <div className="week">
                    <div className="space">Week 8</div>
                    {this.showWeek(8)}
                </div>
                <div className="week">
                    <div className="space">Week 9</div>
                    {this.showWeek(9)}
                </div>
                <div className="week">
                    <div className="space">Week 10</div>
                    {this.showWeek(10)}
                </div>
                <div className="week">
                    <div className="space">Week 11</div>
                    {this.showWeek(11)}
                </div>
                <div className="week">
                    <div className="space">Week 12</div>
                    {this.showWeek(12)}
                </div>
                <div className="week">
                    <div className="space">Week 13</div>
                    {this.showWeek(13)}
                </div>
                <div className="week">
                    <div className="space">Week 14</div>
                    {this.showWeek(14)}
                </div>
                <div className="week">
                    <div className="space">Week 15</div>
                    {this.showWeek(15)}
                </div>
                <div className="week">
                    <div className="space">Week 16</div>
                    {this.showWeek(16)}
                </div>
            </div>
        )
    }
}

export default FullMarathon;