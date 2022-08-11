import React, {useEffect, useState} from 'react'
import '../home/home.css'
import '../common/_base.css'
import './advertisement.css'
import NavigationBar from "../common/NavigationBar";
import corgi from "../../resources/corgi.jpg"
import {useParams} from "react-router-dom";
import AdvertisementService from "../../services/AdvertisementService";
import {formatDate} from "../../util/formatDate";
import UserService from "../../services/UserService";
import LoadingSpinner from "../common/LoadingSpinner";

function SingleAdvertisement() {
    let {id} = useParams();
    const [ad, setAd] = useState(null);
    const [poster, setPoster] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
                    setIsLoading(false);
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

    return (
        <div className="">
            <NavigationBar/>
            <div className="container-vertical">
                {user === null || ad === null ? <LoadingSpinner/> :
                    <div className="ad-container">
                        <div className="image-container">
                            <img src={corgi}/>
                        </div>
                        <div className="ad-info">
                            <p className="hashtag"> #{ad.category} </p>
                            <p> {ad.title} </p>
                            <p className="small-text"> {formatDate(ad.date)}, {ad.city} </p>
                            <p className="description"> {ad.description} </p>
                            <p className="medium-text">Contact</p>
                            <p className="description"> {user.username}, {user.phone} </p>
                        </div>

                    </div>
                }
            </div>
        </div>
    );
}

export default SingleAdvertisement;
