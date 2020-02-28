import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import CalendarPage from './CalendarPage'
import HalfMarathon from './HalfMarathon'
import FiveK from './FiveK'
import TenK from './TenK'
import FullMarathon from './FullMarathon'


export const Friend = (props) => {

    const [viewSchedule, setSchedule] = useState(false)
    const [schedule, setScheduleName] = useState("")

    const thisUser = props.users.find(user=>user["id"] == props.match.params.id)
    const findRaces = props.userRaces.filter(userRace=>userRace["user"] == props.match.params.id)
    const userPhoto = props.photos.find(photo=>photo["user"] == props.match.params.id)

    const handleClick = (name) => {
        setSchedule(true)
        setScheduleName(name)
    }

    const showRaces = () => {
            return findRaces.map(race=>{
                if(race["race_name"]){
                    return [
                            <p>{race["race_name"]} <button onClick={() => {handleClick(race["distance"])}} value={race["distance"]}>View Progress</button></p>
                    ]
                }else return [
                    <p>{race["distance"]} <button onClick={() => {handleClick(race["distance"])}} value={race["distance"]}>View Progress</button></p>
                ]
            })
        }

    return (
        <>
            <Link to="/friends"><button className="back">{`<< back to friends`}</button></Link>
            <div className="friend">
                <div className="friend-profile">
                    {typeof userPhoto !== "undefined" ? <img className="profile-photo" src={userPhoto["photo"]}></img> : <img src="https://affordableamericaninsurance.com/wp-content/uploads/2017/04/no-image-icon-hi.png"></img>}
                    {typeof thisUser !== "undefined" && findRaces.length > 0 ? <h2>{thisUser["first_name"]} is training for:</h2> : null}
                    {typeof thisUser !== "undefined" && findRaces.length === 0 ? <h2>{thisUser["first_name"]} is not training for anything yet</h2> : null}
                    {showRaces()}
                    <div className="friend-schedule">
                        {viewSchedule && schedule === "half marathon" ? <HalfMarathon friend={true} thisFriend={thisUser["id"]} activities={props.activities} workouts={props.workouts}/> : null}
                        {viewSchedule && schedule === "5k" ? <FiveK friend={true} thisFriend={thisUser["id"]} activities={props.activities} workouts={props.workouts}/> : null}
                        {viewSchedule && schedule === "10k" ? <TenK friend={true} thisFriend={thisUser["id"]} activities={props.activities} workouts={props.workouts}/> : null}
                        {viewSchedule && schedule === "full marathon" ? <FullMarathon friend={true} thisFriend={thisUser["id"]} activities={props.activities} workouts={props.workouts}/> : null}
                    </div>
                </div>
            </div>
        </>
    )
}