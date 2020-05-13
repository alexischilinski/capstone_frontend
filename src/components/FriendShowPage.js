import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import HalfMarathon from './HalfMarathon'
import FiveK from './FiveK'
import TenK from './TenK'
import FullMarathon from './FullMarathon'
import Modal from './Modal'


export const Friend = (props) => {

    const [
        viewSchedule, 
        setSchedule
    ] = useState(false)
    const [
        schedule, 
        setScheduleName
    ] = useState("")
    const [
        modal, 
        showModal
    ] = useState(false)

    const thisUser = props.users.find(user =>
        user["id"] == props.match.params.id
    )
    const findRaces = props.userRaces.filter(userRace =>
        userRace["user"] == props.match.params.id
    )
    const incompleteRaces = props.userRaces.filter(userRace =>
        userRace["user"] == props.match.params.id && 
            !userRace["completed"]
    )
    const userPhoto = props.photos.find(photo =>
        photo["user"] == props.match.params.id
    )
    const completedRaces = props.userRaces.filter(userRace =>
        userRace["user"] == props.match.params.id 
            && userRace["completed"]
    )

    const handleClick = (event) => {
        if (event.target.className === "view-progress") {
            setSchedule(true)
            setScheduleName(event.target.value)
        } else if (event.target.className === "send-message") {
            showModal(!modal)
        } else if (event.target.className === "close-button") {
            showModal(!modal)
        }
    }

    const showRaces = () => {
        return findRaces.map(race=>{
            if (race["race_name"] && 
                !race["completed"]) {
                return (
                    <p className="heading">
                        {race["race_name"]}
                        <button
                            className="view-progress"
                            onClick={handleClick}
                            value={race["distance"]}
                        >View Progress
                        </button>
                    </p>
                )
            } else if (!race["race_name"]) {
                return (
                    <p className="heading">
                        {race["distance"]} 
                        <button 
                            className="view-progress"
                            onClick={handleClick}
                            value={race["distance"]}
                            >View Progress
                        </button>
                    </p>
                )
            }
        })
    }

    const showCompletedRaces = () => {
        if(completedRaces.length === 0){
            if(thisUser){
                return (
                    <p>
                        {thisUser["first_name"]} has not completed any races yet.
                    </p>
                )
            }
        } else 
            return completedRaces.map(race => {
                if (race["completed"]) {
                    if (race["race_name"]) {
                        return (
                                <p>
                                    {race["race_name"]}
                                </p>
                        )
                    } else {
                        return (
                            <p>
                                {race["distance"]}
                            </p>
                        )
                    }
                }
            })
        }

    const showFollowers = () => {
        if (thisUser) {
            const followers = props.friends.filter(friend =>
                friend["following"] == thisUser["id"]
            )
            return (
                <h4>
                    {followers.length}
                </h4>
            )
        }
    }

    const showFollowing = () => {
        if (typeof thisUser !== "undefined") {
            const following = props.friends.filter(friend =>
                friend["follower"] == thisUser["id"]
            )
            return (
                <h4>
                    {following.length}
                </h4>
            )
        }
    }

    return (
        <>
            {thisUser
                ? <Modal 
                    sendMessage={true} 
                    show={modal} 
                    handleClick={handleClick} 
                    friend={thisUser} 
                    sendMessage={props.sendMessage}
                /> 
                : null
            }
            <Link 
                to="/friends">
                <button 
                    className="back"
                    >{`<< back to friends`}
                </button>
            </Link>
            <div className="friend">
                <div className="friend-profile">
                    <div className="friend-info">
                        {userPhoto 
                            ? <div 
                                className="profile-photo" 
                                style={{
                                    backgroundImage: `url(${userPhoto["photo"]})`, 
                                    backgroundSize: "100%", 
                                    backgroundRepeat: 'no-repeat', 
                                    backgroundPosition: 'center', 
                                    backgroundColor: 'black'
                                }}>
                            </div> 
                            : <div 
                                className="profile-photo" 
                                style={{
                                    backgroundImage: `url('https://i.imgflip.com/1slnr0.jpg')`, 
                                    backgroundSize: "100%", 
                                    backgroundRepeat: 'no-repeat', 
                                    backgroundPosition: 'center', 
                                    backgroundColor: 'black'
                                }}>
                            </div>
                        }
                        {thisUser 
                            ? <p className="heading">
                                {`${thisUser["first_name"]} ${thisUser["last_name"]}`}
                            </p>
                             : null
                        }
                        <div 
                            className="friend-followers">
                            <p className="follow-p">
                                followers {showFollowers()}
                            </p>
                            <p className="follow-p">
                                following {showFollowing()}
                            </p>
                        </div>
                        <div>
                            <button 
                                onClick={handleClick} 
                                className="send-message"
                                >Send Message
                            </button>
                        </div>
                        {thisUser && incompleteRaces.length > 0 
                            ? <h2>
                                {thisUser["first_name"]} is training for:
                            </h2> 
                            : null
                        }
                        {thisUser && incompleteRaces.length === 0 
                            ? <h2>
                                {thisUser["first_name"]} is not training for anything
                            </h2>
                             : null
                            }
                        {showRaces()}
                    </div>
                    <div className="friend-info completed-race">
                        <p className="heading"
                            >Completed Races
                        </p>
                        {showCompletedRaces()}
                    </div>
                </div>
                <div className="friend-schedule">
                    {viewSchedule && schedule === "half marathon" 
                        ? <HalfMarathon 
                            friend={true} 
                            thisFriend={thisUser["id"]} 
                            activities={props.activities} 
                            workouts={props.workouts} 
                            userRaces={findRaces}
                        /> 
                        : null
                    }
                    {viewSchedule && schedule === "5k" 
                        ? <FiveK 
                            friend={true} 
                            thisFriend={thisUser["id"]} 
                            activities={props.activities} 
                            workouts={props.workouts} 
                            userRaces={findRaces}
                        /> 
                        : null
                    }
                    {viewSchedule && schedule === "10k" 
                        ? <TenK 
                            friend={true} 
                            thisFriend={thisUser["id"]} 
                            activities={props.activities} 
                            workouts={props.workouts} 
                            userRaces={findRaces}
                        /> 
                        : null
                    }
                    {viewSchedule && schedule === "full marathon" 
                        ? <FullMarathon 
                            friend={true} 
                            thisFriend={thisUser["id"]} 
                            activities={props.activities} 
                            workouts={props.workouts} 
                            userRaces={findRaces}
                        /> 
                        : null
                    }
                </div>
            </div>
        </>
    )
}