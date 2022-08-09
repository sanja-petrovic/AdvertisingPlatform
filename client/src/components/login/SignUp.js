import React, { useState }  from 'react'
import ReactDOM from 'react-dom/client'
import '../common/_base.css'
import './credentials.css'
import {Link} from "react-router-dom";

class SignUp extends React.Component {
    render() {
        return (
            <div className="container-vertical">
                <p>Welcome!</p>
                <form className="credentials-form">
                    <label>Username</label>
                    <input className="text-box" type="text"/>
                    <label>Phone number</label>
                    <input className="text-box" type="tel" pattern="^\+?(?:[0-9] ?){6,14}[0-9]$"/>
                    <label>Password</label>
                    <input className="text-box" type="password"/>
                    <button className="primary-button">Sign up</button>
                </form>
                <Link to="/login">Already a member? Log in here!</Link>
            </div>
        );
    }
}

export default SignUp;