import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const tmdbUrl = "https://www.themoviedb.org/tv";

class TitleInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titleInfo: null
        };
        this.initialState = this.state;
    }

    async componentDidMount() {
        const { titleId, fetchTitleInfo } = this.props;
        const titleInfo = await fetchTitleInfo(titleId);
        this.setState({ titleInfo: titleInfo });
        console.log(titleInfo);
    }

    render() {
        const { getImage } = this.props;
        const { titleInfo } = this.state;

        return (
            titleInfo !== null ?
                <div>
                    <h4>
                        <Link to="/">Back To Home</Link>
                    </h4>
                    <div className="titleData m-3">
                        <div className="titlePoster mb-4">
                            <a href={`${tmdbUrl}/${titleInfo.id}`} target="_blank" rel="noreferrer">
                                <img alt={titleInfo.name} src={getImage(titleInfo.poster_path, "w500")} />
                            </a>
                        </div>
                        <div className="titleContent">
                            <div>
                                <h4>{titleInfo.name} <br /> ({titleInfo.original_name}) </h4>
                            </div>
                            <div className="mt-4">
                                <h5>Rating: {titleInfo.vote_average}/10 <FontAwesomeIcon icon={faStar} color="orange" ></FontAwesomeIcon></h5>
                                <h6>{titleInfo.vote_count} votes</h6>
                            </div>
                            <div className="mt-4">
                                <h5>{
                                    titleInfo.networks.map((network) => (
                                        <div key={network.id}>
                                            <img alt={network.name} src={getImage(network.logo_path, "w92")}></img>
                                        </div>
                                    ))
                                }
                                </h5>
                            </div>
                            <div className="mt-4">
                                <h6>Air Date: {titleInfo.first_air_date}</h6>
                            </div>
                            <div>
                                <h6>Genres:&nbsp;
                                    {
                                        titleInfo.genres.map((genre) => (
                                            genre.name + " • "
                                        ))
                                    }
                                </h6>
                            </div>
                            <div>
                                <h6>Episodes: {titleInfo.number_of_episodes}</h6>
                            </div>
                            <div className="mt-4">
                                <h6>Overview:</h6><p>{titleInfo.overview}</p>
                            </div>
                        </div>
                    </div>
                    <div className="backdropImage m-5">
                        <img alt={titleInfo.name} src={getImage(titleInfo.backdrop_path, "w780")}></img>
                    </div>
                </div>
                : <div>
                    <div>Loading title information...</div>
                    <br />
                    <Spinner animation="border" />
                </div>
        );
    }
}

export default TitleInfo;