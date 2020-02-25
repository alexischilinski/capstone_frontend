import React, { Component } from 'react'
import Form from './Form'

class Home extends Component {

    state = {
        races: [],
        newRace: false,
    }

    componentDidMount(){
        this.setState({
            races: this.props.userRaces
        })
    }

    componentDidUpdate(nextProps){
        if(nextProps.userRaces !== this.state.races){
            this.setState({
                races: nextProps.userRaces
            })
        }
    }

    toggleNewRace = () => {
        this.setState({
            newRace: true,
        })
    }

    showRaces = () => {
        return this.props.userRaces.map(userRace=>{
            return <p className="prompt race-name">{userRace["distance"]}</p>
        })
    }

    render(){
        return(
            <div>
                {this.props.userRaces.length === 0 ? [
                <p className="prompt">What distance are you training for? (choose one)</p>,
                <Form race_type={true} addUserRace={this.props.addUserRace}/>,
                ]: [
                    <p className="prompt">You're in the middle of training for:</p>,
                    this.showRaces(),
                    <p className="prompt">Use the navigation bar to view your or your friends' progress.</p>
                ]}
                {!this.state.newRace ? <p className="prompt">Training for another race? <button onClick={this.toggleNewRace} className="another-race">add it here</button></p> : null}
                {this.state.newRace ? <Form race_type={true} addUserRace={this.props.addUserRace} toggleNewRace={this.toggleNewRace}/> : null}
            </div>
        )
    }
}

export default Home;