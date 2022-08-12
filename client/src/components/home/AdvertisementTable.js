import React from 'react'
import './home.css'
import '../common/_base.css'
import AdvertisementService from "../../services/AdvertisementService";
import {formatDate} from "../../util/formatDate";
import {getUsernameFromToken} from "../../util/getUsernameFromToken";
import {getIdFromToken} from "../../util/getUsernameFromToken";
import {Link, Navigate } from "react-router-dom";
import * as PropTypes from "prop-types";

function Row(props) {
    function handleDelete(id, e) {
        e.preventDefault();
        console.log('Deleting...');
        AdvertisementService.deleteById(id);
        window.location.href = "/";
    }

    return <tr>
        <td></td>
        <td><b>{props.row.title}</b></td>
        <td>€{props.row.price}</td>
        <td>{props.row.city}</td>
        <td>{props.row.category}</td>
        <td>{props.formattedDate} </td>
        <td><Link to={`/advertisements/${props.row._id}`}>
            <button className="primary-button"> Check out</button>
        </Link>
            {
                props.byUser && <div className="buttons">
                    <Link to={`/advertisements/${props.row._id}/edit`}>
                        <button className="secondary-button">Edit</button>
                    </Link>
                <button className="delete-button" onClick={(e) => {handleDelete(props.row._id, e)}}>Delete</button>
            </div>
            }
        </td>
    </tr>;
}

Row.propTypes = {
    row: PropTypes.any,
    formattedDate: PropTypes.any,
    byUser: PropTypes.any,
    onClick: PropTypes.func
};

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

    async handleDelete(id, e) {
        e.preventDefault();
        console.log('Deleting...');
        window.location.href = "/";
    }

    renderTable() {
        if(this.state.advertisements !== null) {
            return this.state.advertisements.map(function(row) {
                    const formattedDate = formatDate(row.date);
                    const token = sessionStorage.getItem("token");
                    const byUser = token !== null ? ( row.user === getIdFromToken(token) ) : false;
                    return <Row key={row._id} row={row} formattedDate={formattedDate} byUser={byUser}
                                />
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