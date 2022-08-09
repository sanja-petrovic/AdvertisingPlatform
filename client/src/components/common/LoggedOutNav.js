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
                    <li><Link to="/signup"><button className="primary-button">Sign up</button></Link></li>
                    <li><Link to="/login"><button className="secondary-button">Log in</button></Link></li>
                </ul>
            </div>
        );
    }
}



export default LoggedOutNav;