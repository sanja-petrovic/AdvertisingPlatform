import React, {useEffect, useState} from 'react'
import '../home/home.css'
import '../common/_base.css'
import './advertisement.css'
import NavigationBar from "../common/NavigationBar";
import corgi from "../../resources/corgi.jpg"
import {Link, useParams} from "react-router-dom";
import AdvertisementService from "../../services/AdvertisementService";
import {formatDate} from "../../util/formatDate";
import UserService from "../../services/UserService";
import LoadingSpinner from "../common/LoadingSpinner";
import {getIdFromToken} from "../../util/getUsernameFromToken";
import {setAuthToken} from "../../util/setAuthToken";

class NewAdvertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            url: "",
            price: null,
            category: "",
            user: getIdFromToken(localStorage.getItem("token")),
            city: "",
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
        console.log(this.state);
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            let advertisement = await AdvertisementService.post(this.state.title, this.state.description, this.state.url, this.state.price, this.state.category, this.state.user, this.state.city);
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
                    <p>New advertisement</p>
                    <form className="credentials-form" onSubmit={this.handleSubmit}>
                        <label>Title</label>
                        <input className="text-box" type="text" name="title" onChange={this.handleInputChange} value={this.state.title}/>
                        <label>Price</label>
                        <div>
                            <input type="text" placeholder="€" disabled className="currency-box text-box"/>
                            <input className="money-box text-box" type="number" name="price" onChange={this.handleInputChange} value={this.state.price}/>
                        </div>
                        <label>Category</label>
                        <select className="text-box" name="category" onChange={this.handleInputChange} value={this.state.category}>
                            <option selected hidden>Category</option>
                            <option>Clothing</option>
                            <option>Tools</option>
                            <option>Sports</option>
                            <option>Accessories</option>
                            <option>Furniture</option>
                            <option>Pets</option>
                            <option>Games</option>
                            <option>Books</option>
                            <option>Technology</option>
                        </select>
                        <label>City</label>
                        <input className="text-box" type="text" name="city" onChange={this.handleInputChange} value={this.state.city}/>

                        <label>Description</label>
                        <textarea className="text-box" name="description" onChange={this.handleInputChange} value={this.state.description}/>

                        <label htmlFor="formFile" className="form-label">Image</label>
                        <input onChange={this.handleInputChange} className="text-box" type="file" accept="image/png, image/jpeg"/>
                        <input type="submit" className="primary-button" value="Post"/>
                    </form>
                    {this.state.error && <p>{this.state.error.request.statusText}</p>}
                </div>
            </div>
        );
    }
}

export default NewAdvertisement;