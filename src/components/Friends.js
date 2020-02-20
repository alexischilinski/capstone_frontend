import React, { Component } from 'react'

export const Friends = () => {
    return(
        <>
            {localStorage.token ? [
                <div className="today">
                    <h1>View Friends</h1>
                </div>
            ]: null}
        </>
    )
}