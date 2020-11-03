import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAdjust } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    render() {
        const { toggleTheme } = this.props;
        return (
            <div className="HeaderComponent">
                <h3>Discover Asian Dramas</h3>
                <h6 className="mt-4">Designed and developed by: <a href="https://github.com/lyjacky11" target="_blank" rel="noreferrer">Jacky Ly</a></h6>
                <div className="headerElements">
                    <Link className="homeLink" to="/"><h5><FontAwesomeIcon icon={faHome} />&nbsp; Home</h5></Link>
                    <FontAwesomeIcon className="themeBtn" icon={faAdjust} size="2x" onClick={toggleTheme} />
                    <span className="themeText" onClick={toggleTheme}>&nbsp; <b>Toggle Theme</b></span>
                </div>
            </div>

        );
    }
}

export default Header;