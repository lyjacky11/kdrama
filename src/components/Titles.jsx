import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Scroller from "react-infinite-scroller";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import "../App.css";

class Titles extends Component {

    render() {
        const { titles, currentPage, totalPages, getImage, nextPage } = this.props;

        return (
            <div className="m-3">

                {
                    (titles.length !== 0) ? console.log(titles) : null
                }

                {
                    (titles.length !== 0) ?
                        <Scroller
                            loadMore={nextPage}
                            hasMore={currentPage < totalPages}
                            loader=
                            {
                                <div key={0}>
                                    <div>Loading more titles...</div>
                                    <br />
                                    <Spinner animation="border" />
                                </div>
                            }
                        >
                            <div className="titlesContainer">
                                {
                                    titles.map((title, index) => (
                                        <Link key={index} className="titleLink" to={`/title/${title.id}`}>
                                            <div key={index} className="titleInfo">
                                                <div>
                                                    <b>{title.name} <br /> {title.original_name}</b>
                                                </div>
                                                <br />
                                                <div>
                                                    Rating: {title.vote_average}/10 <FontAwesomeIcon icon={faStar} color="orange" ></FontAwesomeIcon>
                                                    <br /> Air Date: {title.first_air_date}
                                                </div>
                                                <br />
                                                <div>
                                                    <img alt={title.name} src={getImage(title.poster_path)}></img>
                                                </div>
                                                <br />
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                            <br />
                        </Scroller>
                        : <div className="titlesContainer">
                            <div className="titleInfo">
                                <h3>No titles found!</h3>
                            </div>
                        </div>
                }
                <br />
            </div>
        );
    }
}

export default Titles;