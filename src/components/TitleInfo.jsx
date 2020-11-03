import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const tmdbUrl = "https://www.themoviedb.org/tv";
const numOtherTitles = 6;

class TitleInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titleInfo: null,
            otherTitles: null
        };
    }

    async componentDidMount() {
        const { titleId, fetchTitleInfo, fetchOtherTitles } = this.props;
        const titleInfo = await fetchTitleInfo(titleId);
        const otherTitles = await fetchOtherTitles(titleId);
        document.title = `${titleInfo.name} ${(titleInfo.original_name !== titleInfo.name) ? "(" + titleInfo.original_name + ")" : ""} | Discover Asian Dramas`;
        this.setState({
            titleInfo: titleInfo,
            otherTitles: otherTitles
        });
        console.log(titleInfo);
        console.log(otherTitles);
    }

    render() {
        const { getPoster, getBackdrop, getNetwork } = this.props;
        const { titleInfo } = this.state;

        return (
            (titleInfo !== null && !titleInfo.response) ?
                <div className="TitleInfoComponent">
                    <div className="backdrop" style={{ backgroundImage: `url(${getBackdrop(titleInfo.backdrop_path, "w780")}` }}></div>
                    <div className="titleData">
                        <div className="titlePoster mb-4">
                            <a href={`${tmdbUrl}/${titleInfo.id}`} target="_blank" rel="noreferrer">
                                <img alt={titleInfo.name} src={getPoster(titleInfo.poster_path, "w500")} />
                            </a>
                        </div>
                        <div className="titleContent">
                            <div>
                                <h4>{titleInfo.name} <br /> {(titleInfo.original_name !== titleInfo.name) ? titleInfo.original_name : ""}</h4>
                            </div>
                            <div className="mt-4">
                                <h5>Rating: {titleInfo.vote_average}/10 <FontAwesomeIcon icon={faStar} color="orange" ></FontAwesomeIcon></h5>
                                <h6>{titleInfo.vote_count} votes</h6>
                            </div>
                            <div className="mt-4">
                                <h5>{
                                    titleInfo.networks.map((network) => (
                                        <img className="mr-4" key={network.id} alt={network.name} src={getNetwork(network.logo_path, "w92")}></img>
                                    ))
                                }
                                </h5>
                            </div>
                            <div className="mt-4">
                                <h5>Air Date: {titleInfo.first_air_date}</h5>
                            </div>
                            <div>
                                <h5>Episodes: {titleInfo.number_of_episodes}</h5>
                            </div>
                            <div className="mt-4">
                                <h6>Genres:&nbsp;
                                    {
                                        titleInfo.genres.map((genre) => (
                                            genre.name + " • "
                                        ))
                                    }
                                </h6>
                            </div>
                            <div>
                                <h6>Language: {titleInfo.original_language}</h6>
                            </div>
                            <div className="mt-4">
                                <h6>Overview:</h6><p>{titleInfo.overview}</p>
                            </div>
                            <div>
                                <h4 className="otherTitlesHeading">Recommendations:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="otherTitles">
                        {
                            this.state.otherTitles.slice(0,numOtherTitles).map((otherTitle, index) => (
                                <div key={index} className="otherTitlePoster mb-4">
                                    <a href={`/title/${otherTitle.id}`}>
                                        <img alt={otherTitle.name} src={getPoster(otherTitle.poster_path, "w500")} />
                                    </a>
                                    <p className="mt-3"><b>{otherTitle.name} <br /> {(otherTitle.original_name !== otherTitle.name) ? otherTitle.original_name : ""}</b></p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                : <div>
                    <div className="p-4 m-3">
                        <h5>Invalid Title ID!</h5>
                    </div>
                </div>
        );
    }
}

export default TitleInfo;