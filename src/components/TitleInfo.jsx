import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
                        <div className="titlePoster">
                            <img alt={titleInfo.name} src={getImage(titleInfo.poster_path)}></img>
                        </div>
                        <div className="titleContent mt-4">
                            <div>
                                <h4>Title: {titleInfo.name} ({titleInfo.original_name}) </h4>
                            </div>
                            <div className="mt-5">
                                <h5>Rating: {titleInfo.vote_average}/10 <FontAwesomeIcon icon={faStar} color="orange" ></FontAwesomeIcon></h5>
                            </div>
                            <div>
                                <h5>Air Date: {titleInfo.first_air_date}</h5>
                            </div>
                            <div>
                                <h5>Genres:&nbsp;
                                    {
                                        titleInfo.genres.map((genre) => (
                                            genre.name + " • "
                                        ))
                                    }
                                </h5>
                            </div>
                            <div>
                                <h5>Episodes: {titleInfo.number_of_episodes}</h5>
                            </div>
                            <div className="mt-5">
                                <b>Overview:</b> <br /> <p>{titleInfo.overview}</p>
                            </div>
                        </div>
                    </div>
                    <div className="backdropImage m-5">
                        <img alt={titleInfo.name} src={getImage(titleInfo.backdrop_path)}></img>
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