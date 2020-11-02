import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Header, Filters, Titles, TitleInfo, Footer } from './components';
import { getTitles, getImage, getTitleInfo } from './api.js';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const discoverAPIendpoint = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`;
const titleAPIendpoint = `https://api.themoviedb.org/3/tv/`;
// var imgConfigAPI = `https://api.themoviedb.org/3/configuration?`;

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			api_key      : process.env.REACT_APP_TMDB_API_KEY,
			display_lang : "en-US",
			orig_lang    : "ko",
			sort_by      : "popularity.desc",
			genres       : "18",
			titles       : [],
			page         : 1,
			total_pages  : 0
		};
		this.initialState = this.state;
	}
    
	async componentDidMount () {
		const discoverAPI = `${discoverAPIendpoint}&language=${this.state.display_lang}&sort_by=${this.state
			.sort_by}&with_genres=${this.state.genres}&with_original_language=${this.state
			.orig_lang}&include_null_first_air_dates=false`;
		const apiResult = await getTitles(discoverAPI + "&page=" + this.state.page);
		this.setState({
			titles      : apiResult.results,
			total_pages : apiResult.total_pages
		});

		/*
        imgConfigAPI += `api_key=${apiKey}`;
        const imageConfig = await getImageConfig(imgConfigAPI);
        console.log(imageConfig);
        */
    }

    changeSortBy = async (event) => {
        const newSortBy = event.target.value;
        this.setState({
            sort_by: newSortBy,
            page: 1
        });
        const discoverAPI = `${discoverAPIendpoint}&language=${this.state.display_lang}&sort_by=${newSortBy}&with_genres=${this.state.genres}&with_original_language=${this.state
			.orig_lang}&include_null_first_air_dates=false`;
        const apiResult = await getTitles(discoverAPI + "&page=1");
		this.setState({
			titles      : apiResult.results,
			total_pages : apiResult.total_pages
		});
    }

    changeYear = async (event) => {
        const newYear = event.target.value;
        this.setState({page: 1});
        const discoverAPI = `${discoverAPIendpoint}&language=${this.state.display_lang}&sort_by=${this.state.sort_by}&with_genres=${this.state.genres}&with_original_language=${this.state
            .orig_lang}&include_null_first_air_dates=false`;
        const apiResult = await getTitles(discoverAPI + "&first_air_date_year=" + newYear + "&page=1");
        this.setState({
			titles      : apiResult.results,
			total_pages : apiResult.total_pages
		});
    }

	nextPage = () => {
		setTimeout(async () => {
            this.setState({ page: this.state.page + 1 });
            const discoverAPI = `${discoverAPIendpoint}&language=${this.state.display_lang}&sort_by=${this.state
                .sort_by}&with_genres=${this.state.genres}&with_original_language=${this.state
                .orig_lang}&include_null_first_air_dates=false`;
			const apiResult = await getTitles(discoverAPI + "&page=" + this.state.page);
			const updatedTitles = [].concat(this.state.titles, apiResult.results);
			this.setState({
				titles      : updatedTitles,
				total_pages : apiResult.total_pages
			});
		}, 1250);
    };
    
    fetchTitleInfo = async (titleId) => {
        const titleAPI = `${titleAPIendpoint}${titleId}?api_key=${apiKey}&language=${this.state.display_lang}`;
        const apiResult = await getTitleInfo(titleAPI);
        return apiResult;
    }

	render () {
		return (
			<div className="text-center">
				<Header />
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Filters changeSortBy={this.changeSortBy} changeYear={this.changeYear} />
                            { this.state.titles.length !== 0 ? 
                                <Titles
                                    titles={this.state.titles}
                                    currentPage={this.state.page}
                                    totalPages={this.state.total_pages}
                                    getImage={getImage}
                                    nextPage={this.nextPage}
                                />
                                :   <div>
                                        <div>Loading titles...</div>
                                        <br />
                                        <Spinner animation="border" />
                                    </div>
                            }
                        </Route>
                        <Route exact path="/title/:id" render={ props => <TitleInfo titleId={props.match.params.id} fetchTitleInfo={this.fetchTitleInfo} getImage={getImage} /> } >
                        </Route>
                        <Route>
                            <div>Invalid Page!</div>
                        </Route>
                    </Switch>
                </Router>
				<Footer />
			</div>
		);
	}
}

export default App;
