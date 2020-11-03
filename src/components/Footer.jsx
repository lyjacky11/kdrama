import React, { Component } from 'react';
import logo from '../TMDB.svg';

class Footer extends Component {
    render() {
        return (
            <div className="FooterComponent">
                <h6>Data and title information from:</h6>
                <p><a href="https://www.themoviedb.org" target="_blank" rel="noreferrer"><img alt="TMDB Logo" src={logo} width="150"></img></a></p>
                <h6>The Movie Database (TMDb)</h6>
            </div>
        );
    }
}

export default Footer;