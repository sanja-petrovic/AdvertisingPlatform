import React from 'react'
import './home.css'
import '../common/_base.css'
import AdvertisementTable from "./AdvertisementTable";

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="home-content">
                    <p className="subtitle">Advertisements</p>
                    <p className="description">Check out all available advertisements below.</p>
                    <AdvertisementTable/>
                </div>
            </div>
        );
    }
}

export default Home;