import React, { useState }  from 'react'
import '../home/home.css'
import './_base.css'
import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"
import {setAuthToken} from "../../util/setAuthToken";

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
                    <li><Link to="/advertisements/new"><button className="primary-button">Post an ad</button></Link></li>
                    <li><Link to="/"><button className="secondary-button" onClick={this.handleLogOut}>Log out</button></Link></li>
                </ul>
            </div>
        );
    }
}



export default LoggedInNav;