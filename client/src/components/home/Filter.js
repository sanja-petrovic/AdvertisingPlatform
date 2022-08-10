import React from 'react'
import './home.css'
import '../common/_base.css'

class Filter extends React.Component {
    render() {
        return <div className="dropdown-container">
            <div className="input-group mb-3">
                <select className="form-select">
                    <option disabled selected hidden>Category</option>
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
                <input type="text" className="form-control" placeholder="Name"
                />
                <input type="number" className="form-control" placeholder="Price (min)"
                />
                <input type="number" className="form-control" placeholder="Price (max)"
                />
            </div>
            <input type="checkbox" id="mine-only"/>
            <label for="mine-only">Show mine only</label>
        </div>
    }
}

export default Filter;