import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Scroller from "react-infinite-scroller";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

class Titles extends Component {

    componentDidMount() {
        document.title = "Discover Asian Dramas";
    }

    render() {
        const { titles, queryTitles, searchQuery, currentPage, totalPages, totalResults, queryTotalResults, getPoster, nextPage } = this.props;
        const titlesToDisplay = searchQuery !== "" ? queryTitles : titles;

        return (
            <div className="TitlesComponent">
                {
                    (titlesToDisplay.length !== 0) ? console.log(titlesToDisplay) : null
                }
                <div className="resultsNum">
                    {
                        (searchQuery === "") ? <b>Displaying: {queryTotalResults} of {totalResults} results</b>
                            : <b>Displaying: {queryTotalResults} results</b>
                    }
                </div>
                {
                    (titlesToDisplay.length !== 0) ?
                        <Scroller
                            className="scroller"
                            loadMore={nextPage}
                            hasMore={currentPage < totalPages}
                            loader={
                                <div key={0} className="loader" >
                                    <h6>Loading more titles...</h6>
                                    <br />
                                    <Spinner animation="border" />
                                </div>
                            }
                        >
                            <div className="titlesContainer">
                                {
                                    titlesToDisplay.map((title, index) => (
                                        <Link key={index} className="titleLink" to={`/title/${title.id}`} >
                                            <div key={index} className="titleInfo">
                                                <div className="titleName">
                                                    <p><b>{title.name} <br /> {title.original_name !== title.name ? title.original_name : ""}</b></p>
                                                </div>
                                                <div className="titleRating">
                                                    <p>
                                                        Rating: {title.vote_average}/10 <FontAwesomeIcon icon={faStar} color="orange" ></FontAwesomeIcon>
                                                        <br /> Air Date: {title.first_air_date}
                                                    </p>
                                                </div>
                                                <div className="titleThumbnail">
                                                    <p><img alt={title.name} src={getPoster(title.poster_path, "w500")}></img></p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                            <br />
                        </Scroller>
                        :
                        <div className="m-5">
                            <h5>No titles found for this query!</h5>
                        </div>
                }
                <br />
            </div>
        );
    }
}

export default Titles;