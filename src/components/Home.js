import React, { Component } from 'react'
import Form from './Form'
import {Link} from 'react-router-dom'

class Home extends Component {

    state = {
        races: [],
        newRace: false,
        preview: true,
        previewType: "",
        addPhoto: false,
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
            newRace: !this.state.newRace,
        })
    }

    togglePhotoForm = () => {
        this.setState({
            addPhoto: true,
        })
    }

    showRaces = () => {
        return this.props.userRaces.map(userRace=>{
            if(!userRace["completed"]){
                if(userRace["race_name"]){
                    return <p className="prompt race-name">{userRace["race_name"]}</p>
                }else return <p className="prompt race-name">{userRace["distance"]}</p>
            }
        })
    }

    showCompletedRaces = () => {
        const completedRaces = this.props.userRaces.filter(userRace=>userRace["completed"])
        if(completedRaces.length === 0){
            return <p className="prompt-auth">You have not completed any races yet.</p>
        }else return completedRaces.map(completedRace=>{
            return <p className="prompt race-name">{completedRace["race_name"]}</p>
        })
    }
    
    showPreview = (race) => {
        this.setState({
            preview: true,
            previewType: race
        })
    }

    showPhoto = () => {
        if(!this.props.photos){
            return [
                <img className="no-photo" src="https://affordableamericaninsurance.com/wp-content/uploads/2017/04/no-image-icon-hi.png"></img>,
                <button onClick={this.togglePhotoForm} className="add-photo">Add a Profile Photo</button>
            ]
        }else return [
                <img className="has-photo" src={this.props.photos["photo"]}></img>
            ]
    }

    showFollowers = () => {
        const followers = this.props.friends.filter(friend=>friend["following"] == localStorage.user)
        return <h4>{followers.length}</h4>
    }
    
    showFollowing = () => {
        const following = this.props.friends.filter(friend=>friend["follower"] == localStorage.user)
        return <h4>{following.length}</h4>
    }

    render(){
        const incompleteRaces = this.props.userRaces.filter(userRace=>!userRace["completed"])
        return(
            <>
                <div className="profile">
                    <div className="user-photo">
                        {typeof this.props.user !== "undefined" ? [
                                                        <p className="welcome">Welcome, {this.props.user["first_name"]}!</p>,
                                                        this.showPhoto(),
                                                        this.state.addPhoto ? <Form photo={true} addPhoto={this.props.addPhoto}/> : null,
                                                        <div className="followers">
                                                            <p>followers {this.showFollowers()}</p>
                                                            <p> following {this.showFollowing()}</p>
                                                        </div>
                                                        ] : null}
                        <p className="dashboard-prompt">↖ Open the navigation bar to view your schedule, follow friends, and view friends' progress.</p>
                    </div>
                        <div>
                            {this.props.userRaces.length === 0 ? [
                            <p className="prompt">What distance are you training for? (choose one)</p>,
                            <Form race_type={true} addUserRace={this.props.addUserRace} toggleNewRace={this.toggleNewRace} showPreview={this.showPreview}/>,
                            ]: [
                            incompleteRaces.length > 0 ? <div className="user-race-div">
                                <p className="prompt">You're training for:</p>
                                {this.showRaces()}
                                <Link style={{fontSize: '1.2rem', color: 'blue', textDecoration: 'none'}} to="/calendar">View Progress</Link>
                                </div> : null,
                                <div className="user-race-div completed-race">
                                    <p className="prompt">Completed Races:</p>
                                    {this.showCompletedRaces()}
                                </div>
                            ]}
                        </div>
                </div>
                <div className="new-race">
                    {!this.state.newRace && this.props.userRaces.length > 0 ? <p className="prompt">Training for another race? <button onClick={this.toggleNewRace} className="another-race">add it here</button></p> : null}
                    {this.state.newRace ? <Form race_type={true} addUserRace={this.props.addUserRace} toggleNewRace={this.toggleNewRace} showPreview={this.showPreview}/> : null}
                </div>
            </>
        )
    }
}

export default Home;