import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    render() {
        return (
            <div className="HeaderComponent p-4">
                <h2>Discover Asian Dramas</h2>
                <h4 className="backLink">
                    <Link to="/"><FontAwesomeIcon icon={faHome} />&nbsp; Home</Link>
                </h4>
            </div>

        );
    }
}

export default Header;