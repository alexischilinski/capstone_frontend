import React, { Component } from 'react'

class CalendarPage extends Component {

    render(){
        return(
            <>
                {localStorage.token ? [
                    <div className="today">
                        <h1>Calendar</h1>
                    </div>
                ]: null}
            </>
        )
    }
}

export default CalendarPage