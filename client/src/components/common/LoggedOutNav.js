import React, { useState }  from 'react'
import '../home/home.css'
import './_base.css'
import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"

class LoggedOutNav extends React.Component {
    render() {
        return (
            <div>
                <ul className="menu">
                    <li><button className="primary-button"><Link to="/signup">Sign up</Link></button></li>
                    <li><button className="secondary-button"><Link to="/login">Log in</Link></button></li>
                </ul>
            </div>
        );
    }
}



export default LoggedOutNav;