import React, { useState }  from 'react'
import '../home/home.css'
import './_base.css'
import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"

class LoggedInNav extends React.Component {
    render() {
        return (
            <div>
                <p>Welcome, <i>{this.props.username}</i>!</p>
                <ul className="menu">
                    <li><button className="primary-button"><Link to="/">Post an ad</Link></button></li>
                    <li><button className="secondary-button"><Link to="/">Sign out</Link></button></li>
                </ul>
            </div>
        );
    }
}



export default LoggedInNav;