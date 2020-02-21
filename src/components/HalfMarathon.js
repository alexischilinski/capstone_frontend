import React, { Component } from 'react'
import Day from './Day'

class HalfMarathon extends Component {

    showDayNames = () => {
        const dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        return dayArray.map(day=>{
            return <div className="dayname">{day}</div>
        })
    }

    showWeek = (number) => {
        const filteredAct = this.props.activities.filter(activity=>activity["week"] === number)
        return filteredAct.map(activity=>{
            return <Day workout={activity}/>
        })
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
            </div>
        )
    }
}

export default HalfMarathon;