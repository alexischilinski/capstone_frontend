import React, { Component } from 'react'
import HalfMarathon from './HalfMarathon'
import FiveK from './FiveK'
import TenK from './TenK'
import FullMarathon from './FullMarathon'
import {Link} from 'react-router-dom'

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
        const incompleteRaces = this.props.userRaces.filter(userRace=>!userRace["completed"])
        if(incompleteRaces.length === 0){
         return [<p className="prompt">You don't have a training schedule yet.</p>,
            <p className="prompt">Go to your {<Link style={{color: 'blue', textDecoration: 'none'}} to="/">dashboard</Link>} to select a schedule.</p>]
        }else if(incompleteRaces.length === 1){
            if(this.props.userRaces[0]["distance"] === "half marathon"){
                return <HalfMarathon history={this.props.history} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/>
            }else if(this.props.userRaces[0]["distance"] === "full marathon"){
                return <FullMarathon history={this.props.history} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/>
            }else if(this.props.userRaces[0]["distance"] === "10k"){
                return <TenK history={this.props.history} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/>
            }else if(this.props.userRaces[0]["distance"] === "5k"){
                return <FiveK history={this.props.history} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/>
            }
        }else if(this.props.userRaces.length > 1){
             return this.props.userRaces.map(userRace=>{
                if(!userRace["completed"]){
                    return <button onClick={this.handleClick} className="race-option" value={userRace["distance"]}>{userRace["distance"]}</button>
                    }
                })
        }
            
    }

    render(){
        const incompleteRaces = this.props.userRaces.filter(userRace=>!userRace["completed"])
        return(
            <>
                {localStorage.token ? [
                    <div className="today">
                        {incompleteRaces.length > 1 && !this.state.showRace ? <p className="prompt">Which training schedule would you like to view?</p> : null}
                        {!this.state.showRace ? this.chooseRace() : null}
                        {this.state.showRace ? <button onClick={this.handleClick} className="another-race">{`<< view another schedule`}</button> : null }
                        {this.state.race === "10k" ? <TenK history={this.props.history} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/> : null}
                        {this.state.race === "5k" ? <FiveK history={this.props.history} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/> : null}
                        {this.state.race === "half marathon" ? <HalfMarathon history={this.props.history} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/> : null}
                        {this.state.race === "full marathon" ? <FullMarathon history={this.props.history} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/> : null}
                    </div>
                ]: null}
            </>
        )
    }
}

export default CalendarPage