import React from 'react'
import './home.css'
import '../common/_base.css'
import AdvertisementService from "../../services/AdvertisementService";
import {formatDate} from "../../util/formatDate";
import {getUsernameFromToken} from "../../util/getUsernameFromToken";

class AdvertisementTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advertisements: null
        }
    }

    async componentDidMount() {
        this.setState({
            advertisements: await AdvertisementService.getAll()
        })
    }

    renderTable() {
        if(this.state.advertisements !== null) {
            return this.state.advertisements.map(function(row) {
                    const formattedDate = formatDate(row.date);
                    const token = sessionStorage.getItem("token");
                    const byUser = token !== null ? ( row.user === getUsernameFromToken(token) ) : false;
                    return <tr key={ row._id }>
                        <td></td>
                        <td>{ row.title }</td>
                        <td>{ row.price }</td>
                        <td>{ row.city }</td>
                        <td>{ row.category }</td>
                        <td>{ formattedDate } </td>
                        <td><button className="button primary-button">Check out</button>
                            { byUser && <div><button className="button primary-button">Delete</button><button className="button primary-button">Edit</button></div> }
                        </td>
                    </tr>
                }
            );
        }
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
            {this.state.advertisements !== null && this.renderTable()
            }
            </tbody>
        </table>;
    }
}

export default AdvertisementTable;