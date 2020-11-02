import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Scroller from "react-infinite-scroller";
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
                            loader={<Spinner key={0} animation="border" />}
                        >
                            <div className="titlesContainer">
                                {
                                    titles.map((title, index) => (
                                        <div key={index} className="titleInfo">
                                            <div>
                                                <b>{title.name} <br /> {title.original_name}</b>
                                            </div>
                                            <br />
                                            <div>
                                                Title Rating: {title.vote_average} <br /> Air Date: {title.first_air_date}
                                            </div>
                                            <br />
                                            <div>
                                                <img alt={title.name} src={getImage(title.poster_path)} width="200"></img>
                                            </div>
                                            <br />
                                        </div>
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