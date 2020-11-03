import React, { Component } from 'react';
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
        // const networkInfo = [];
        // titleInfo.networks.map(async (network) => (
        //     networkInfo.push(await fetchNetworkInfo(network.id))
        // ));
        // this.setState({ networkInfo: networkInfo });
        // console.log(networkInfo);
        this.setState({ titleInfo: titleInfo });
        console.log(titleInfo);
    }

    render() {
        const { getImage } = this.props;
        const { titleInfo } = this.state;

        return (
            (titleInfo !== null && !titleInfo.response) ?
                <div className="titleInfoComponent">
                    <div className="backdrop" style={{ backgroundImage: `url(${getImage(titleInfo.backdrop_path, "w780")}` }}></div>
                    <div className="titleData" >
                        <div className="titlePoster mb-4">
                            <a href={`${tmdbUrl}/${titleInfo.id}`} target="_blank" rel="noreferrer">
                                <img alt={titleInfo.name} src={getImage(titleInfo.poster_path, "w500")} />
                            </a>
                        </div>
                        <div className="titleContent">
                            <div>
                                <h4>{titleInfo.name} <br /> {titleInfo.original_name !== titleInfo.name ? titleInfo.original_name : ""}</h4>
                            </div>
                            <div className="mt-4">
                                <h5>Rating: {titleInfo.vote_average}/10 <FontAwesomeIcon icon={faStar} color="orange" ></FontAwesomeIcon></h5>
                                <h6>{titleInfo.vote_count} votes</h6>
                            </div>
                            <div className="mt-4">
                                <h5>{
                                    titleInfo.networks.map((network) => (
                                        <img className="mr-4" key={network.id} alt={network.name} src={getImage(network.logo_path, "w92")}></img>
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
                </div>
                : <div>
                    <div className="titleData p-4 m-3">
                        <h5>Invalid Title ID!</h5>
                    </div>
                </div>
        );
    }
}

export default TitleInfo;