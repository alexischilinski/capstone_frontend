import React, { Component } from 'react'

export const Header = (props) => {
    return(
        <div className="header">
            <h1>
                OnTrack
            </h1>
            {props.loggedin || localStorage.token 
                ? <button 
                    onClick={props.toggleNav} 
                    className={props.class
                        ? "navclose" 
                        : "navbutton"
                    }>
                </button> 
                : null}
        </div>
    )
}