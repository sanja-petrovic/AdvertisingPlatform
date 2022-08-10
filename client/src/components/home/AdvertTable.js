import React from 'react'
import './home.css'
import '../common/_base.css'
import dress from "../../resources/dress.jpg";
import corgi from "../../resources/corgi.jpg";

class AdvertTable extends React.Component {
    constructor() {
        super();

    }
    render() {
        return <table className="table">
            <thead>
            <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>City</th>
                <th>Categories</th>
                <th>Date posted</th>
                <th className="button-col"></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><img src={dress}/></td>
                <td><b>Prom dress</b></td>
                <td>$249</td>
                <td>Amsterdam</td>
                <td>clothing</td>
                <td>10.08.2022. 13:35</td>
                <td>
                    <button className="primary-button">Check out</button>
                    <button className="primary-button">Edit</button>
                    <button className="primary-button">Delete</button>
                </td>
            </tr>
            <tr>
                <td><img src={corgi}/></td>
                <td><b>Corgi puppy</b></td>
                <td>$1099</td>
                <td>Lisbon</td>
                <td>pets</td>
                <td>09.08.2022. 11:06</td>
                <td>
                    <button className="button primary-button">Check out</button>
                </td>
            </tr>
            </tbody>
        </table>;
    }
}

export default AdvertTable;