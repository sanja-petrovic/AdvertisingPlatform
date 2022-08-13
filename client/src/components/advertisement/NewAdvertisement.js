import React from 'react'
import '../home/home.css'
import '../common/_base.css'
import './advertisement.css'
import AdvertisementService from "../../services/AdvertisementService";
import {getIdFromToken} from "../../util/getUsernameFromToken";

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
            error: null,
            selectedFile: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
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

    handleFileUpload(event) {
        event.preventDefault();
        this.setState({url: URL.createObjectURL(event.target.files[0])});

    }

    downloadFile(content, fileName, contentType) {

    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            await AdvertisementService.post(this.state.title, this.state.description, this.state.url, this.state.price, this.state.category, this.state.user, this.state.city);
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
                        <input onChange={this.handleFileUpload} className="text-box" type="file" accept="image/*"/>
                        <input type="submit" className="primary-button" value="Post"/>
                    </form>
                    {this.state.error && <p>{this.state.error.request.statusText}</p>}
                </div>
            </div>
        );
    }
}

export default NewAdvertisement;