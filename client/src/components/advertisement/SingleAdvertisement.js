import React, {useEffect, useState} from 'react'
import '../home/home.css'
import '../common/_base.css'
import './advertisement.css'
import NavigationBar from "../common/NavigationBar";
import corgi from "../../assets/corgi.jpg"
import {useParams} from "react-router-dom";
import AdvertisementService from "../../services/AdvertisementService";
import {formatDate} from "../../util/formatDate";
import UserService from "../../services/UserService";
import LoadingSpinner from "../common/LoadingSpinner";
import {getIdFromToken} from "../../util/getUsernameFromToken";
import EditAdvertisement from "./EditAdvertisement";

function SingleAdvertisement(props) {
    let {id} = useParams();
    const [ad, setAd] = useState(null);
    const [user, setUser] = useState(null);
    const [byUser, setByUser] = useState(false);
    const [isEditable, setIsEditable] = useState(props.editable || false);
    let formattedDate;

    useEffect(() => {
        const fetchData = async () => {
            const result = await AdvertisementService.getById(id);
            if (result !== null) {
                setAd(result);
                formattedDate = formatDate(result.date);
                const user = await UserService.getById(result.user);
                if (user !== null) {
                    setUser(user);
                    const token = sessionStorage.getItem("token");
                    setByUser(token !== null && getIdFromToken(token) === user._id);
                }
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (ad !== null) {
                const result = await UserService.getById(ad.user);
                if (result !== null) {
                    setUser(result);
                }
            }
        };
        fetchData();
    }, []);

    async function handleDelete(e) {
        e.preventDefault();
        console.log('Deleting...');
        AdvertisementService.deleteById(ad._id);
        window.location.href = "/";
    }

    async function handleEdit(e) {
        e.preventDefault();
        console.log('Editing...');
        setIsEditable(true);
        window.history.pushState("", "", `/advertisements/${ad._id}/edit`);
    }

    return (
        <div className="">
            <div className="container-vertical">
                {user === null || ad === null ? <LoadingSpinner/> :
                    ( isEditable ? (
                        <EditAdvertisement advertisement={ad}/>
                    ) : (
                        <div className="ad-container">
                        <div className="image-container">
                            <img src={corgi}/>
                        </div>
                        <div className="ad-info">
                            <p className="hashtag"> #{ad.category} </p>
                            <p> {ad.title} </p>
                            <p className="small-text"> {formatDate(ad.date)}, {ad.city} </p>
                            <p className="description"> {ad.description} </p>
                            <p> €{ad.price} </p>
                            <p className="medium-text">Contact</p>
                            <p className="description"> {user.username}, {user.phone} </p>
                            { byUser && <div className="buttons"><button className="secondary-button" onClick={handleEdit}>Edit</button><button className="delete-button" onClick={handleDelete}>Delete</button></div> }
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    );
}

export default SingleAdvertisement;
