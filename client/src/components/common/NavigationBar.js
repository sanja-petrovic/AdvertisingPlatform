import React, { useState }  from 'react'
import '../home/home.css'
import './_base.css'
import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: sessionStorage.getItem("token") !== null};
    }

    render() {
        let nav;
        if(this.state.isLoggedIn) {
            const token = sessionStorage.getItem("token");
            const tokenParts = token.split('.');
            const encodedPayload = tokenParts[1];
            const rawPayload = atob(encodedPayload);
            const user = JSON.parse(rawPayload);
            nav = <LoggedInNav username={ user.username }/>;
        } else {
            nav = <LoggedOutNav/>;
        }
        return (
            <div className="nav-bar">
                <Link to="/"><p className="title">Advr.</p></Link>
                {nav}
            </div>
        );
    }
}

export default NavigationBar;