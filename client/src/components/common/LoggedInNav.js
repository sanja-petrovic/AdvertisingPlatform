import React, { useState }  from 'react'
import '../home/home.css'
import './_base.css'
import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"
import {setAuthToken} from "../../setAuthToken";

class LoggedInNav extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut(event) {
        setAuthToken(null);
        sessionStorage.clear();
        window.location.href = '/';
    }
    render() {
        return (
            <div>
                <p>Welcome, <i>{this.props.username}</i>!</p>
                <ul className="menu">
                    <li><button className="primary-button"><Link to="/">Post an ad</Link></button></li>
                    <li><button className="secondary-button" onClick={this.handleLogOut}><Link to="/">Log out</Link></button></li>
                </ul>
            </div>
        );
    }
}



export default LoggedInNav;