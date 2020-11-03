import React, { Component } from 'react';
import logo from '../TMDB.svg';

class Footer extends Component {
    render() {
        const currentYear = new Date().getFullYear();
        return (
            <div className="FooterComponent">
                <h5>The Movie Database (TMDb):</h5>
                <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer"><img alt="TMDB Logo" src={logo} width="150"></img></a>
                <h6 className="mt-4">© Copyright {currentYear}, Jacky Ly.</h6>
            </div>
        );
    }
}

export default Footer;