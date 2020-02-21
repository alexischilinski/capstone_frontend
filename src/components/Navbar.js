import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export const Navbar = (props) => {

    const logout = () => {
        props.logOut()
        props.toggleNav()
    }

    return (
        <div className={props.class ? "navbar" : "navbar slide"}>
            <ul>
                <Link style={{color: 'white', textDecoration: 'none'}} to="/">
                    <li>Home</li>
                </Link>
                <Link style={{color: 'white', textDecoration: 'none'}} to="/calendar">
                    <li>Your Training Plan</li>
                </Link>
                <Link style={{color: 'white', textDecoration: 'none'}} to="/friends">
                    <li>Friends' Activities</li>
                </Link>
                <Link onClick={logout} style={{color: 'white', textDecoration: 'none'}} to="/">
                    <li>Logout</li>
                </Link>
            </ul>
        </div>
    )
}