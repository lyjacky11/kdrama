import React, { Component } from "react";
import { Header, Filters, Titles, Footer } from "./components";
import { getTitles, getImage } from "./api.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const discoverAPIendpoint = `https://api.themoviedb.org/3/discover/tv?`;
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
		const discoverAPI = `${discoverAPIendpoint}api_key=${this.state.api_key}&language=${this.state.display_lang}&sort_by=${this.state
			.sort_by}&with_genres=${this.state.genres}&with_original_language=${this.state
			.orig_lang}&include_null_first_air_dates=false`;
		const apiResult = await getTitles(discoverAPI + "&page=" + this.state.page);
		this.setState({
			titles      : apiResult.results,
			total_pages : apiResult.total_pages
		});

		/*
        imgConfigAPI += `api_key=${this.state.api_key}`;
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
        const discoverAPI = `${discoverAPIendpoint}api_key=${this.state.api_key}&language=${this.state.display_lang}&sort_by=${newSortBy}&with_genres=${this.state.genres}&with_original_language=${this.state
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
        const discoverAPI = `${discoverAPIendpoint}api_key=${this.state.api_key}&language=${this.state.display_lang}&sort_by=${this.state.sort_by}&with_genres=${this.state.genres}&with_original_language=${this.state
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
            const discoverAPI = `${discoverAPIendpoint}api_key=${this.state.api_key}&language=${this.state.display_lang}&sort_by=${this.state
                .sort_by}&with_genres=${this.state.genres}&with_original_language=${this.state
                .orig_lang}&include_null_first_air_dates=false`;
			const apiResult = await getTitles(discoverAPI + "&page=" + this.state.page);
			const updatedTitles = [].concat(this.state.titles, apiResult.results);
			this.setState({
				titles      : updatedTitles,
				total_pages : apiResult.total_pages
			});
		}, 1000);
	};

	render () {
		return (
			<div className="text-center">
				<Header />
                <Filters changeSortBy={this.changeSortBy} changeYear={this.changeYear} />
				<Titles
					titles={this.state.titles}
					currentPage={this.state.page}
					totalPages={this.state.total_pages}
					getImage={getImage}
					nextPage={this.nextPage}
				/>
				<Footer />
			</div>
		);
	}
}

export default App;
