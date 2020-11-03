import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    render() {
        return (
            <div className="HeaderComponent">
                <h3>Discover Asian Dramas</h3>
                <h4 className="homeLink">
                    <Link to="/"><FontAwesomeIcon icon={faHome} />&nbsp; Home</Link>
                </h4>
            </div>

        );
    }
}

export default Header;