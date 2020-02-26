import React, { Component } from 'react'
import Form from './Form'

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
            if(userRace["race_name"]){
                return <p className="prompt race-name">{userRace["race_name"]}</p>
            }else return <p className="prompt race-name">{userRace["distance"]}</p>
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

    render(){
        return(
            <div className="profile">
                <div className="user-photo">
                    {this.showPhoto()}
                    {this.state.addPhoto ? <Form photo={true} addPhoto={this.props.addPhoto}/> : null}
                    {typeof this.props.user !== "undefined" ? <p className="welcome">Welcome, {this.props.user["first_name"]}!</p> : null}
                    <p className="dashboard-prompt">↖ Open the navigation bar to view your schedule, follow friends, and view friends' progress.</p>
                </div>
                    <div>
                        {this.props.userRaces.length === 0 ? [
                        <p className="prompt">What distance are you training for? (choose one)</p>,
                        <Form race_type={true} addUserRace={this.props.addUserRace} toggleNewRace={this.toggleNewRace} showPreview={this.showPreview}/>,
                        ]: [
                            <p className="prompt">You're training for:</p>,
                            this.showRaces()
                        ]}
                        {!this.state.newRace && this.props.userRaces.length > 0 ? <p className="prompt">Training for another race? <button onClick={this.toggleNewRace} className="another-race">add it here</button></p> : null}
                        {this.state.newRace ? <Form race_type={true} addUserRace={this.props.addUserRace} toggleNewRace={this.toggleNewRace} showPreview={this.showPreview}/> : null}
                        {/* {this.state.preview && this.state.previewType === "5k" ? <img src="../photos/5k.png"></img> : null} */}
                        {/* <img src='./photos/10k.jpg'></img> */}
                    </div>
            </div>
        )
    }
}

export default Home;