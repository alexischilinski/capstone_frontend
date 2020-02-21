import React, { Component } from 'react'
import HalfMarathon from './HalfMarathon'

class CalendarPage extends Component {

    state = {
        fivek: [],
        tenk: [],
        halfmarathon: [],
        fullmarathon: []
    }

    // componentDidMount(){
    //     fetch('http://localhost:8000/api/activities/')
    //         .then(response=>response.json())
    //         .then(result=>result.filter(activity=>{
    //             if(activity["race"] === "half"){
    //                 this.setState({
    //                     halfmarathon: [...this.state.halfmarathon, activity]
    //                 })
    //             }
    //         })
    //     )
    // }

    render(){
        return(
            <>
                {localStorage.token ? [
                    <div className="today">
                        <HalfMarathon activities={this.props.activities}/>
                    </div>
                ]: null}
            </>
        )
    }
}

export default CalendarPage