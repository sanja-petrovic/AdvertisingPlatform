import React, { useState }  from 'react'
import '../common/_base.css'
import './credentials.css'
import {Link, Navigate} from "react-router-dom";
import UserService from "./UserService";
import {setAuthToken} from "../../setAuthToken";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passwordCheck: "",
            phone: "",
            user: null,
            error: null,
            disabled: 'disabled'
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;

        await this.setState({
            [name]: value
        });

        console.log(this.state);
        if (this.state.username !== "" && this.state.password !== "" && this.state.passwordCheck !== "" && this.state.phone !== "" && this.state.password === this.state.passwordCheck) {
            this.setState({
                    disabled: ''
                }
            );
        } else {
            this.setState({
                    disabled: 'disabled'
                }
            );
        }
        console.log(this.state.disabled);
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            let user = await UserService.signUp(this.state.username, this.state.password, this.state.phone);
            this.setState({ user });
            setAuthToken(user);
            sessionStorage.setItem('token', JSON.stringify(user));
        } catch (error) {
            this.setState({ error });
        }
    }

    render() {
        return (
            <div className="container-vertical">
                <p>Welcome!</p>
                {this.state.user && (
                    <Navigate to="/" replace={true} />
                )}
                <form className="credentials-form" onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input className="text-box" name="username" type="text" onChange={this.handleInputChange} value={this.state.username}/>
                    <label>Phone number</label>
                    <input className="text-box" type="tel" name="phone" pattern="^\+?(?:[0-9] ?){6,14}[0-9]$" onChange={this.handleInputChange} value={this.state.phone}/>
                    <label>Password</label>
                    <input className="text-box" name="password" type="password" onChange={this.handleInputChange} value={this.state.password}/>
                    <label>Password, again</label>
                    <input className="text-box" name="passwordCheck" type="password" onChange={this.handleInputChange} value={this.state.passwordCheck}/>
                    <button type="submit" disabled={this.state.disabled} className="primary-button">Sign up</button>
                </form>
                {this.state.error && <p>{this.state.error.request.statusText}</p>}
                {this.state.password !== this.state.passwordCheck && <p>Passwords must match!</p>}
                <Link to="/login">Already a member? Log in here!</Link>
            </div>
        );
    }
}

export default SignUp;