import React, { Component } from 'react'
import {Link} from 'react-router-dom'


class DayShowPage extends Component{

    state = {
        workout: null
    }
    

    render(){
        // console.log(this.props.match.params.id)
        // console.log(this.props.activities)
        return(
            <>
                {localStorage.token ?
                    <div>
                        <Link to="/calendar">
                            <p>Go Back</p>
                        </Link>
                    </div>
                : null}
            </>
        )
     }
}

export default DayShowPage;