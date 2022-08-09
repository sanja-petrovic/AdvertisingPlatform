import React, { useState }  from 'react'
import ReactDOM from 'react-dom/client'
import './home.css'
import '../common/_base.css'
import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"
import dress from "../../resources/dress.jpg"
import corgi from "../../resources/corgi.jpg"

class Home extends React.Component {
    render() {
        return (
            <div className="home-content">
                <p className="subtitle">Adverts</p>
                <p className="description">Check out all available adverts below.</p>
                <table className="advert-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>City</th>
                            <th>Categories</th>
                            <th className="button-col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src={dress}/> </td>
                            <td><b>Prom dress</b></td>
                            <td>$249</td>
                            <td>Amsterdam</td>
                            <td>clothing</td>
                            <td><button className="primary-button">Check out</button><button className="primary-button">Edit</button><button className="primary-button">Delete</button></td>
                        </tr>
                        <tr>
                            <td><img src={corgi}/> </td>
                            <td><b>Corgi puppy</b></td>
                            <td>$1099</td>
                            <td>Lisbon</td>
                            <td>pets</td>
                            <td><button className="primary-button">Check out</button><button className="primary-button">Edit</button><button className="primary-button">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Home;