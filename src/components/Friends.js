import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export const Friends = (props) => {

    const handleClick = (event) => {
        if(event.target.className === "follow-button"){
            props.followUser(event.target.value)
        }else if(event.target.className === "view-profile"){
            console.log(event.target.value)
        }
    }

    const showRunners = () => {
        return props.users.map(user=>{
            if(user["username"] !== "alexischilinski" && user["username"] !== localStorage.username){
                return [
                    <p>{user["first_name"]} {user["last_name"]}
                    <button className="follow-button" onClick={handleClick} value={user["id"]}>Follow</button>
                    <Link to={`/friends/${user["id"]}`}><button className="view-profile" value={user["id"]}>View Profile</button></Link>
                    </p>
                ]
            }
        })
    }


    // const showRunners = () => {
    //     return props.users.map(user=>{
    //         if(user["username"] !== "alexischilinski" && user["username"] !== localStorage.username){
    //             return [
    //                 <p>{user["first_name"]} {user["last_name"]} <button className="follow-button" onClick={handleClick} value={user["id"]}>Follow</button></p>
    //             ]
    //         }
    //     })
    // }
    
    const showFriends = () => {
        return props.friends.map(friend=>{
            if(friend["follower"] == localStorage.user){
                const findFriend = props.users.find(user=>user["id"] === friend["following"])
                if(typeof findFriend !== 'undefined'){
                    return <p>{findFriend["first_name"]} {findFriend["last_name"]} <Link to={`/friends/${findFriend["id"]}`}><button className="view-profile" value={findFriend["id"]}>View Profile</button></Link></p>
                }
            }
        })
    }

    // console.log(showRunners())

    return(
        <div className="friends">
            {localStorage.token ? [
                <div className="all-users">
                    <h1>Choose runners you'd like to follow:</h1>
                    {showRunners()}
                </div>,
                <div className="your-friends">
                    <h1>Runners you're following:</h1>
                    {showFriends()}
                </div>
            ]: null}
        </div>
    )
}