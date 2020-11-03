import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAdjust } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    
    toggleTheme() {
        document.querySelector("body").classList.toggle("light");
    }

    render() {
        return (
            <div className="HeaderComponent">
                <h3>Discover Asian Dramas</h3>
                <div className="headerElements">
                    <Link className="homeLink" to="/"><h4><FontAwesomeIcon icon={faHome} />&nbsp; Home</h4></Link>
                    <FontAwesomeIcon className="themeBtn" icon={faAdjust} size="2x" onClick={this.toggleTheme} />
                </div>
            </div>

        );
    }
}

export default Header;