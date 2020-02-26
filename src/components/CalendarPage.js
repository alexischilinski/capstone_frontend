import React, { Component } from 'react'
import HalfMarathon from './HalfMarathon'
import FiveK from './FiveK'
import TenK from './TenK'
import FullMarathon from './FullMarathon'

class CalendarPage extends Component {

    state = {
        fivek: [],
        tenk: [],
        halfmarathon: [],
        fullmarathon: [],
        race: "",
        showRace: false
    }

    // componentDidMount(){
    //     fetch('http://localhost:8000/api/activities/')
    //         .then(response=>response.json())
    //         .then(result=>result.filter(activity=>{
    //             if(activity["race"] === "half"){
    //                 this.setState({
    //                     halfmarathon: [...this.state.halfmarathon, activity]
    //                 })
    //             }
    //         })
    //     )
    // }

    handleClick = (event) => {
        if(event.target.className === "race-option"){
            this.setState({
                showRace: true,
                race: event.target.value
            })
        }else if(event.target.className="another-race"){
            this.setState({
                showRace: false,
                race: ""
            })
        }
    }

    chooseRace = () => {
        if(this.props.userRaces.length === 1){
            if(this.props.userRaces[0]["distance"] === "half marathon"){
                return <HalfMarathon activities={this.props.activities} workouts={this.props.workouts}/>
            }else if(this.props.userRaces[0]["distance"] === "full marathon"){
                return <FullMarathon activities={this.props.activities} workouts={this.props.workouts}/>
            }else if(this.props.userRaces[0]["distance"] === "10k"){
                return <TenK activities={this.props.activities} workouts={this.props.workouts}/>
            }else if(this.props.userRaces[0]["distance"] === "5k"){
                return <FiveK activities={this.props.activities} workouts={this.props.workouts}/>
            }
        }else return this.props.userRaces.map(userRace=>{
                return <button onClick={this.handleClick} className="race-option" value={userRace["distance"]}>{userRace["distance"]}</button>
            })
    }

    render(){
        return(
            <>
                {localStorage.token ? [
                    <div className="today">
                        {this.props.userRaces.length > 1 && !this.state.showRace ? <p className="prompt">Which training schedule would you like to view?</p> : null}
                        {!this.state.showRace ? this.chooseRace() : null}
                        {this.state.showRace ? <button onClick={this.handleClick} className="another-race">{`<< view another schedule`}</button> : null }
                        {this.state.race === "10k" ? <TenK activities={this.props.activities} workouts={this.props.workouts}/> : null}
                        {this.state.race === "5k" ? <FiveK activities={this.props.activities} workouts={this.props.workouts}/> : null}
                        {this.state.race === "half marathon" ? <HalfMarathon activities={this.props.activities} workouts={this.props.workouts}/> : null}
                        {this.state.race === "full marathon" ? <FullMarathon activities={this.props.activities} workouts={this.props.workouts}/> : null}
                    </div>
                ]: null}
            </>
        )
    }
}

export default CalendarPage