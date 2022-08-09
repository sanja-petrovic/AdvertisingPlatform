import React from 'react'
import './home.css'
import '../common/_base.css'
import {Link} from "react-router-dom"

class SimpleSearchBar extends React.Component {
    render() {
        return (
            <div className="search">
                <input type="text" className="searchBar" placeholder="Enter book title or author..."/>
                <button className="searchButton">Search</button>
            </div>
        );
    }
}

export default SimpleSearchBar;