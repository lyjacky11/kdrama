import React, { Component } from 'react';
import logo from '../TMDB.svg';

class Footer extends Component {
    render() {
        const currentYear = new Date().getFullYear();
        return (
            <div className="footer mt-3">
                <h5>Data fetched from:</h5>
                <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer"><img alt="TMDB Logo" src={logo} width="150"></img></a>
                <h5 className="mt-4">© Copyright {currentYear}, Jacky Ly.</h5>
            </div>

        );
    }
}

export default Footer;