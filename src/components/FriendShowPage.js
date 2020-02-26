import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export const Friend = (props) => {

    const thisUser = props.users.find(user=>user["id"] == props.match.params.id)
    const findRaces = props.userRaces.filter(userRace=>userRace["user"] == props.match.params.id)
    const userPhoto = props.photos.find(photo=>photo["user"] == props.match.params.id)

    const handleClick = (event) => {
        console.log(event.target.value)
    }

    const showRaces = () => {
            return findRaces.map(race=>{
                return [
                        <p>{race["distance"]} <button onClick={handleClick} value={race["distance"]}>View Progress</button></p>
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
                    <div>
                        <h2>show schedule</h2>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}