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
        this.state = {isLoggedIn: false};
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let nav;
        if(isLoggedIn) {
            nav = <LoggedInNav/>;
        } else {
            nav = <LoggedOutNav/>;
        }
        return (
            <div className="nav-bar">
                <p className="title">Advr.</p>
                {nav}
            </div>
        );
    }
}

export default NavigationBar;