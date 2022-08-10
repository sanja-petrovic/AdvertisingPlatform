import React from 'react'
import './home.css'
import '../common/_base.css'
import dress from "../../resources/dress.jpg"
import corgi from "../../resources/corgi.jpg"
import Filter from "./Filter";
import AdvertTable from "./AdvertTable";
import NavigationBar from "../common/NavigationBar";

class Home extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="home-content">
                    <p className="subtitle">Advertisements</p>
                    <p className="description">Check out all available advertisements below.</p>
                    <Filter/>
                    <AdvertTable/>
                </div>
            </div>
        );
    }
}

export default Home;