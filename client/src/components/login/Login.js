import React, { useState }  from 'react'
import ReactDOM from 'react-dom/client'
import '../common/_base.css'
import './credentials.css'
import {Link} from "react-router-dom";

class Login extends React.Component {
    render() {
        return (
            <div className="container-vertical">
                <p>Welcome back!</p>
                <form className="credentials-form">
                    <label>Username</label>
                    <input className="text-box" type="text"/>
                    <label>Password</label>
                    <input className="text-box" type="password"/>
                    <button className="primary-button">Log in</button>
                </form>
                <Link to="/signup">Not registered yet? Sign up here!</Link>
            </div>
        );
    }
}

export default Login;