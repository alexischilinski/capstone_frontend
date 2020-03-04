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
        showRace: false,
        race_name: ""
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
                race_name: event.target.innerText,
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
            if(incompleteRaces[0]["distance"] === "half marathon"){
                const thisHalfMarathon = this.props.userRaces.find(userRace=>userRace["user"] == localStorage.user && userRace["distance"] === "half marathon" && !userRace["completed"])
                return <HalfMarathon history={this.props.history} race_name={thisHalfMarathon["race_name"]} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/>
            }else if(incompleteRaces[0]["distance"] === "full marathon"){
                const thisFullMarathon = this.props.userRaces.find(userRace=>userRace["user"] == localStorage.user && userRace["distance"] === "full marathon" && !userRace["completed"])
                return <FullMarathon history={this.props.history} race_name={thisFullMarathon["race_name"]} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/>
            }else if(incompleteRaces[0]["distance"] === "10k"){
                const thisTenK = this.props.userRaces.find(userRace=>userRace["user"] == localStorage.user && userRace["distance"] === "10k" && !userRace["completed"])
                return <TenK history={this.props.history} race_name={thisTenK["race_name"]} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/>
            }else if(incompleteRaces[0]["distance"] === "5k"){
                const thisFiveK = this.props.userRaces.find(userRace=>userRace["user"] == localStorage.user && userRace["distance"] === "5k" && !userRace["completed"])
                return <FiveK history={this.props.history} race_name={thisFiveK["race_name"]} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/>
            }
        }else if(this.props.userRaces.length > 1){
             return this.props.userRaces.map(userRace=>{
                if(!userRace["completed"]){
                    return <button onClick={this.handleClick} className="race-option" value={userRace["distance"]}>{userRace["race_name"]}</button>
                    }
                })
        }
            
    }

    render(){
        const incompleteRaces = this.props.userRaces.filter(userRace=>!userRace["completed"])
        return(
            <>
                <div className="calendar-page">
                    {localStorage.token ? [
                        <div className="today">
                            {incompleteRaces.length > 1 && !this.state.showRace ? <p className="prompt">Which training schedule would you like to view?</p> : null}
                            {!this.state.showRace ? this.chooseRace() : null}
                            {this.state.showRace ? <button onClick={this.handleClick} className="another-race">{`<< view another schedule`}</button> : null }
                            {this.state.race === "10k" ? <TenK history={this.props.history} race_name={this.state.race_name} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/> : null}
                            {this.state.race === "5k" ? <FiveK history={this.props.history} race_name={this.state.race_name} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/> : null}
                            {this.state.race === "half marathon" ? <HalfMarathon history={this.props.history} race_name={this.state.race_name} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/> : null}
                            {this.state.race === "full marathon" ? <FullMarathon history={this.props.history} race_name={this.state.race_name} activities={this.props.activities} workouts={this.props.workouts} userRaces={this.props.userRaces} completeRace={this.props.completeRace}/> : null}
                        </div>,
                        <div className="race-tips">
                            <h1>Some tips for race training</h1>
                            <p className="question">So can I just get up and go for a run and that's it?</p>
                            <p>Well, no. It's really important to <a href={"https://www.runnersworld.com/uk/health/a760484/the-rw-complete-guide-to-stretching-for-runners/"} target="_blank">stretch</a> before and after a run, and to keep up with
                            proper <a href={"https://www.active.com/running/articles/14-running-specific-strength-training-exercises/"} target="_blank">conditioning</a>. Choosing not to warm up before and cool down after a run can increase your risk
                            of injury. Also make sure you wear proper <a href={"https://www.runnersworld.com/gear/a20842305/how-to-buy-the-right-running-shoes/"} target="_blank">running shoes</a>--running stores typically have methods for checking your
                            gait to help you find the right shoe for you (don't worry if the shoes your friend wears don't work for you; everyone is different!).</p>
                            <p className="question">What is crosstraining?</p>
                            <p>Crosstraining is a way to strengthen muscles that don't get used while running. According to <a href={"https://www.runnersworld.com/training/a20813186/eight-benefits-of-cross-training/"} target="_blank">this article</a> by Runner's World,
                            there are eight reasons why crosstraining is important for runners. These reasons include injury prevention, rehabilitation, and enhanced motivation.
                            It is extrememly important to exercise and strengthen other muscles and give your running muscles a break. Crosstraining can help you
                            maintain endurance and cardio levels while avoiding potential overuse of running muscles. For example, glute and hip
                            strength are integral for running fitness so your knees don't always feel the brunt of the work while running.</p>
                            <p>Examples of crosstraining include: biking, swimming, elliptical, etc.</p>
                            <p className="question">Should I actually rest on a rest day?</p>
                            <p>Yup. Sí. Oui. YES!!!! Rest is crucial during race training. Impact from running can be really hard on bones and muscles, and they need time
                            to fully repair. Running creates microscopic tears in muscle fibers, and it can put major stress on bone tissue. Good news though: your body can rebuild muscles to be stronger, and
                            can also increase strength within bones. This only happens during time off from activity. If you don't take proper rest days and give your body time to heal, you may be forced to
                            take rest days later due to injury (nobody wants a stress fracture, right?). Be proactive! Respect the rest day! On a rest day, stretching (like yoga--<a href={"https://www.youtube.com/watch?v=of2spyCtUkw"} target="_blank">try this video session</a>) can be beneficial.
                            Rest days are not "forget that I'm training for a race" days. Remember to continue to treat your body right and stay healthy. You can read
                            more about rest days <a href={"https://www.runnersworld.com/health-injuries/a20864022/why-rest-days-are-important/"} target="_blank">here</a>.</p>
                            <p className="question">Is there any equipment that could enhance my strengthening exercises?</p>
                            <p>A foam roller is a great addition to conditioning. It's a low-impact way to stretch and smooth out muscles and the <a href={"https://www.runnersworld.com/uk/health/injury/a775743/5-things-you-need-to-know-about-your-it-band/"} target="_blank">IT band</a>. There are several types
                            of foam rollers, learn how to choose the right one <a href={"https://www.optp.com/blog/How-to-Choose-a-Foam-Roller"} target="_blank">here</a>.
                            There are also <a href={"https://www.runnersworld.com/training/a24843120/resistance-band-exercises/"} target="_blank">exercise bands</a>. These increase resistance during conditioning
                            and can help strengthen muscles further.
                            A <a href={"https://www.businessinsider.com/north-american-healthcare-foot-rocker-2017-2"} target="_blank">foot rocker</a> is great for stretching and strengthening calf and foot muscles.
                            Believe it or not, a lacrosse or golf ball can also be helpful (or even a frozen bottle of water). You can roll it around the bottom of your foot to stretch it and smooth out
                            any tightness. Very useful to remedy cramping or mild <a href={"https://www.runnersworld.com/health-injuries/a19578652/plantar-fasciitis/"} target="_blank">plantar fasciitis</a>.</p>
                            <p>There is a lot of other equipment out there, but these are some basic tools that should be in every runner's home.</p>
                        </div>
                    ]: null}
                    </div>
            </>
        )
    }
}

export default CalendarPage