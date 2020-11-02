import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Header, Filters, Titles, TitleInfo, Footer } from "./components";
import { getTitles, getImage, getTitleInfo, getNetworkInfo } from "./api.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const discoverAPIurl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&include_null_first_air_dates=false`;
const titleAPIurl = `https://api.themoviedb.org/3/tv`;
const networkAPIurl = `https://api.themoviedb.org/3/network`;

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			display_lang  : "en-US",
			orig_lang     : "ko",
			sort_by       : "popularity.desc",
			genres        : "18",
			air_date_year : "",
			page          : 1,
			search_query  : "",
			titles        : [],
			total_pages   : 0,
			total_results : 0
		};
	}

	async componentDidMount () {
		const discoverAPI = `${discoverAPIurl}&language=${this.state.display_lang}&sort_by=${this.state
			.sort_by}&with_genres=${this.state.genres}&with_original_language=${this.state
			.orig_lang}&first_air_date_year=${this.state.air_date_year}&page=${this.state.page}`;
		const apiResult = await getTitles(discoverAPI);
		this.setState({
			titles        : apiResult.results,
			total_pages   : apiResult.total_pages,
			total_results : apiResult.total_results
		});
		this.initialState = this.state;
	}

	resetState = () => {
		this.setState(this.initialState);
	};

	changeSortBy = async (event) => {
		const newSortBy = event.target.value;
		this.setState({
			sort_by : newSortBy,
			page    : 1
		});
		const discoverAPI = `${discoverAPIurl}&language=${this.state
			.display_lang}&sort_by=${newSortBy}&with_genres=${this.state.genres}&with_original_language=${this.state
			.orig_lang}&first_air_date_year=${this.state.air_date_year}&page=${1}`;
		const apiResult = await getTitles(discoverAPI);
		this.setState({
			titles        : apiResult.results,
			total_pages   : apiResult.total_pages,
			total_results : apiResult.total_results
        });
        this.handleSearch(this.state.search_query);
	};

	changeLang = async (event) => {
		const newLang = event.target.value;
		this.setState({
			orig_lang : newLang,
			page      : 1
		});
		const discoverAPI = `${discoverAPIurl}&language=${this.state.display_lang}&sort_by=${this.state
			.sort_by}&with_genres=${this.state.genres}&with_original_language=${newLang}&first_air_date_year=${this
			.state.air_date_year}&page=${1}`;
		const apiResult = await getTitles(discoverAPI);
		this.setState({
			titles        : apiResult.results,
			total_pages   : apiResult.total_pages,
			total_results : apiResult.total_results
        });
        this.handleSearch(this.state.search_query);
	};

	changeYear = async (event) => {
		const newYear = event.target.value;
		this.setState({
			air_date_year : newYear,
			page          : 1
		});
		const discoverAPI = `${discoverAPIurl}&language=${this.state.display_lang}&sort_by=${this.state
			.sort_by}&with_genres=${this.state.genres}&with_original_language=${this.state
			.orig_lang}&first_air_date_year=${newYear}&page=${1}`;
		const apiResult = await getTitles(discoverAPI);
		this.setState({
			titles        : apiResult.results,
			total_pages   : apiResult.total_pages,
			total_results : apiResult.total_results
        });
        this.handleSearch(this.state.search_query);
	};

	handleSearch = (query) => {
        if (query !== "") {
            const titles = this.state.titles;
            const queryTitles = titles.filter((title) => title.name.toLowerCase().includes(query.toLowerCase()));
            this.setState({
                search_query  : query,
                titles        : queryTitles,
                total_pages   : Math.ceil(queryTitles.length / 20),
                total_results : queryTitles.length
            });
        }
	};

	nextPage = () => {
		setTimeout(async () => {
			this.setState({ page: this.state.page + 1 });
			const discoverAPI = `${discoverAPIurl}&language=${this.state.display_lang}&sort_by=${this.state
				.sort_by}&with_genres=${this.state.genres}&with_original_language=${this.state
				.orig_lang}&first_air_date_year=${this.state.air_date_year}&page=${this.state.page}`;
			const apiResult = await getTitles(discoverAPI);
			const updatedTitles = [].concat(this.state.titles, apiResult.results);
			this.setState({
				titles        : updatedTitles,
				total_pages   : apiResult.total_pages,
				total_results : apiResult.total_results
            });
            this.handleSearch(this.state.search_query);
		}, 1250);
	};

	fetchTitleInfo = async (titleId) => {
		const titleAPI = `${titleAPIurl}/${titleId}?api_key=${apiKey}&language=${this.state.display_lang}`;
		return await getTitleInfo(titleAPI);
	};

	fetchNetworkInfo = async (networkId) => {
		const networkAPI = `${networkAPIurl}/${networkId}?api_key=${apiKey}`;
		return await getNetworkInfo(networkAPI);
	};

	render () {
		return (
			<div className="text-center">
				<Header />
				<Router>
					<Switch>
						<Route exact path="/">
							<Filters
								getState={this.state}
								resetState={this.resetState}
								changeSortBy={this.changeSortBy}
								changeLang={this.changeLang}
								changeYear={this.changeYear}
								handleSearch={this.handleSearch}
							/>
							{this.state.titles.length !== 0 ? (
								<Titles
									titles={this.state.titles}
									currentPage={this.state.page}
									totalPages={this.state.total_pages}
									totalResults={this.state.total_results}
									getImage={getImage}
									nextPage={this.nextPage}
								/>
							) : (
								<div className="m-5">
									<h5>No titles found for this query!</h5>
								</div>
							)}
						</Route>
						<Route
							exact
							path="/title/:id"
							render={(props) => (
								<TitleInfo
									titleId={props.match.params.id}
									fetchTitleInfo={this.fetchTitleInfo}
									fetchNetworkInfo={this.fetchNetworkInfo}
									getImage={getImage}
								/>
							)}
						/>
						<Route>
							<Redirect to="/" />
						</Route>
					</Switch>
				</Router>
				<Footer />
			</div>
		);
	}
}

export default App;
