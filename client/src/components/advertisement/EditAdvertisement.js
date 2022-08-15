import React from 'react'
import '../home/home.css'
import '../common/_base.css'
import './advertisement.css'
import AdvertisementService from "../../services/AdvertisementService";
import {formatDate} from "../../util/formatDate";
import {getIdFromToken} from "../../util/getUsernameFromToken";

class EditAdvertisement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.advertisement._id,
            title: props.advertisement.title,
            description: props.advertisement.description,
            url: props.advertisement.url,
            date: formatDate(props.advertisement.date),
            price: props.advertisement.price,
            category: props.advertisement.category,
            user: props.advertisement.user,
            city: props.advertisement.city,
            error: null,
            selectedFile: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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
    }

    async handleSubmit(event) {
        /*event.preventDefault();
        try {
            let advertisement = await AdvertisementService.editById(this.state.id, this.state.title, this.state.description, this.state.url, this.state.price, this.state.category, this.state.city);
            window.location.href = `/advertisements/${this.state.id}`;

        } catch (error) {
            this.setState({error});
        }*/
        event.preventDefault();
        try {
            if(this.state.selectedFile !== null) {
                let url = null;
                const reader = new FileReader();
                reader.readAsDataURL(this.state.selectedFile);
                reader.onload = async () => {
                    url = reader.result;
                    await AdvertisementService.editById(this.state.id, this.state.title, this.state.description, url, this.state.price, this.state.category, this.state.city).then(response => window.location.href = `/advertisements/${this.state.id}`);

                }
                reader.onerror = function (error) {
                    console.log(error);
                }
            } else {
                await AdvertisementService.editById(this.state.id, this.state.title, this.state.description, this.state.url, this.state.price, this.state.category, this.state.city).then(response => window.location.href = `/advertisements/${this.state.id}`);
            }

        } catch (error) {
            this.setState({ error });
            console.log(error.request.statusText);
        }
    }

    handleCancel(event) {
        event.preventDefault();
        window.location.href = `/advertisements/${this.state.id}`;
    }

    handleFileUpload(event) {
        this.setState({selectedFile: event.target.files[0]});
    }

    render() {
        const token = localStorage.getItem("token");
        const editable = token !== null && getIdFromToken(token) === this.props.advertisement.user;
        return (
            editable ? <div className="ad-container editable">
                <div className="image-container">
                    <img src={this.props.advertisement.url}/>
                </div>
                <div className="ad-info">
                    <p className="hashtag">#
                        <select className="text-box" name="category" onChange={this.handleInputChange}
                                value={this.state.category}>
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
                    </p>
                    <p>
                        <input className="text-box" type="text" name="title" onChange={this.handleInputChange}
                               value={this.state.title}/>
                    </p>
                    <p className="small-text">{this.state.date}</p>
                    <p className="small-text">
                        <input className="text-box" type="text" name="city" onChange={this.handleInputChange}
                               value={this.state.city}/>
                    </p>
                    <p className="small-text">
                        <textarea className="text-box" name="description" onChange={this.handleInputChange}
                                  value={this.state.description}/>
                    </p>
                    <p> € <input type="text" className="text-box" name="price" value={this.state.price}
                                 onChange={this.handleInputChange}/></p>
                    <p className="small-text">
                        <input onChange={this.handleFileUpload} className="text-box" type="file" accept="image/*"/>
                    </p>
                    <div className="buttons">
                        <button className="primary-button" onClick={this.handleSubmit}>Confirm</button>
                        <button className="delete-button" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </div>
            </div> : <h1>Access denied.</h1>
        );
    }
}

export default EditAdvertisement;