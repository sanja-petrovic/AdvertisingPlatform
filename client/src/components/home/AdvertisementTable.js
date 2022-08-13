import React from 'react'
import './home.css'
import '../common/_base.css'
import AdvertisementService from "../../services/AdvertisementService";
import {formatDate} from "../../util/formatDate";
import {getIdFromToken} from "../../util/getUsernameFromToken";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import {convertDate} from "../../util/convertDate";

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
                    <button className="delete-button" onClick={(e) => {
                        handleDelete(props.row._id, e)
                    }}>Delete
                    </button>
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
            advertisements: null,
            visibleElements: null,
            categoryParam: "",
            titleParam: "",
            priceParamMin: "",
            priceParamMax: "",
            mineOnlyParam: false

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.filter = this.filter.bind(this);
    }

    async componentDidMount() {
        this.setState({
            advertisements: (await AdvertisementService.getAll()).sort((a, b) => {
                let newA = convertDate(a.date).getTime();
                let newB = convertDate(b.date).getTime();
                return newB - newA;
            }),
            visibleElements: this.state.advertisements
        })
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            this.filter();
        });
    }

    handleCheckBox(event) {
        this.setState({mineOnlyParam: event.target.checked}, () => {
            this.filter();
        });
    }

    renderTable() {
        if (this.state.visibleElements !== null) {
            return this.state.visibleElements.map(function (row) {
                    const formattedDate = formatDate(row.date);
                    const token = sessionStorage.getItem("token");
                    const byUser = token !== null ? (row.user === getIdFromToken(token)) : false;
                    return <Row key={row._id} row={row} formattedDate={formattedDate} byUser={byUser}
                    />
                }
            );
        }
    }

    filter() {
        const categoryParam = this.state.categoryParam === "All" ? "" : this.state.categoryParam;
        const priceParamMin = this.state.priceParamMin === "" ? "0" : this.state.priceParamMin;
        const priceParamMax = this.state.priceParamMax === "" ? Number.MAX_SAFE_INTEGER : this.state.priceParamMax;
        console.log(this.state.advertisements[0].title.toLowerCase().includes(this.state.titleParam.toLowerCase()));
        this.setState({
            visibleElements: this.state.advertisements.filter(advertisement => {
                    if(!advertisement.category.toLowerCase().includes(categoryParam.toLowerCase())) return false;
                    if(!advertisement.title.toLowerCase().includes(this.state.titleParam.toLowerCase())) return false;
                    return advertisement.price >= parseInt(priceParamMin) && advertisement.price <= parseInt(priceParamMax);

                }
            )
        }, () => {
            if (this.state.mineOnlyParam) {
                this.setState({
                    visibleElements: this.state.visibleElements.filter(advertisement =>
                        advertisement.user === getIdFromToken(sessionStorage.getItem("token")))
                })
            }
        })
    }

    render() {
        return <div>
            <div className="dropdown-container">
                <div className="input-group mb-3">
                    <select onChange={this.handleInputChange} className="form-select" name="categoryParam"
                            value={this.state.categoryParam}>
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
                        <option>All</option>
                    </select>
                    <input onChange={this.handleInputChange} type="text" className="form-control" name="titleParam"
                           placeholder="Title" value={this.state.titleParam}
                    />
                    <input onChange={this.handleInputChange} type="number" className="form-control" name="priceParamMin"
                           placeholder="Price (min)" value={this.state.priceParamMin}
                    />
                    <input onChange={this.handleInputChange} type="number" className="form-control" name="priceParamMax"
                           placeholder="Price (max)" value={this.state.priceParamMax}
                    />
                </div>
                {sessionStorage.getItem("token") !== null &&
                    <div><input onChange={this.handleCheckBox} type="checkbox" id="mine-only"/>
                        <label htmlFor="mine-only">Show mine only</label></div>}
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>City</th>
                    <th>Categories</th>
                    <th>Date posted</th>
                    <th className="button-col"/>
                </tr>
                </thead>
                <tbody>
                {this.state.advertisements !== null && this.renderTable()
                }
                </tbody>
            </table>
        </div>
    }
}

export default AdvertisementTable;