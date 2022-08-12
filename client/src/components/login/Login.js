import React, { useState }  from 'react'
import ReactDOM from 'react-dom/client'
import '../common/_base.css'
import './credentials.css'
import UserService from "../../services/UserService";
import {setAuthToken} from "../../util/setAuthToken";
import {
    BrowserRouter as Router,
    Routes, Route, Link, Navigate
} from "react-router-dom"
import NavigationBar from "../common/NavigationBar";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            user: null,
            error: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            let user = await UserService.login(this.state.username, this.state.password);
            this.setState({ user });
            setAuthToken(user);
            sessionStorage.setItem('token', JSON.stringify(user));
            window.location.href = "/";
        } catch (error) {
            this.setState({ error });
            console.log(error.request.statusText);
        }
    }

    render() {
        return (

            <div>
                <div className="container-vertical">
                    <p>Welcome back!</p>
                    <form className="credentials-form" onSubmit={this.handleSubmit}>
                        <label>Username</label>
                        <input className="text-box" type="text" name="username" onChange={this.handleInputChange} value={this.state.username}/>
                        <label>Password</label>
                        <input className="text-box" type="password" name="password" onChange={this.handleInputChange} value={this.state.password}/>
                        <input type="submit" className="primary-button" value="Log in"/>
                    </form>
                    {this.state.error && <p>{this.state.error.request.statusText}</p>}
                    <Link to="/signup">Not registered yet? Sign up here!</Link>
                </div>
            </div>
        );
    }
}

export default Login;