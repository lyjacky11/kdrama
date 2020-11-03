import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Filters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titleById: ""
        }
    }

    setTitleById = (event) => {
        const titleId = event.target.value;
        if (event.key === 'Enter') {
            this.setState({ titleById: titleId });
        }
    }

    toggleFilters = () => {
        const filters = document.querySelector(".filters");
        const search = document.querySelector(".search");
        if (filters.style.display === "none") {
            filters.style.display = "flex";
        } else {
            filters.style.display = "none";
        }
        if (search.style.display === "none") {
            search.style.display = "flex";
        } else {
            search.style.display = "none";
        }
    }

    render() {
        const { getState, resetState, changeSortBy, changeLang, changeYear, handleSearch } = this.props;

        return (
            <div className="FilterComponent">
                <button className="toggleFilters btn btn-primary btn-sm" type="button" onClick={this.toggleFilters}><h6>Toggle Filters</h6></button>
                <div className="filters mt-3">
                    <div className="sortFilter form-group">
                        <label className="mr-4" htmlFor="sort_by">Sort By:</label>
                        <select className="form-control" name="sort_by" id="sort_by" value={getState.sort_by} onChange={changeSortBy}>
                            <option value="popularity.desc">Popularity (Desc)</option>
                            <option value="popularity.asc">Popularity (Asc)</option>

                            <option value="vote_average.desc">Rating (Desc)</option>
                            <option value="vote_average.asc">Rating (Asc)</option>

                            <option value="first_air_date.desc">Air Date (Desc)</option>
                            <option value="first_air_date.asc">Air Date (Asc)</option>
                        </select>
                    </div>
                    <div className="yearFilter form-group">
                        <label className="mr-4" htmlFor="year">Filter By Year:</label>
                        <input className="form-control" type="number" id="year" name="year" value={getState.air_date_year} onChange={changeYear} placeholder="YYYY" step="1" min="1980" max="2100"></input>
                    </div>
                    <div className="langFilter form-group">
                        <label className="mr-4" htmlFor="orig_lang">Filter By Language:</label>
                        <select className="form-control" name="orig_lang" id="orig_lang" value={getState.orig_lang} onChange={changeLang}>
                            <option value="ko">Korean (한국어)</option>
                            <option value="ja">Japanese (日本語)</option>
                            <option value="zh">Mandarin (普通话)</option>
                            <option value="cn">Cantonese (廣州話)</option>
                            <option value="vi">Vietnamese (Tiếng Việt)</option>
                            <option value="th">Thai (ภาษาไทย)</option>
                            <option value="ko,ja,zh,cn,vi,th">All Languages</option>
                        </select>
                    </div>
                </div>
                <div className="search m-3">
                    <div className="searchById form-group">
                        <label className="mr-4" htmlFor="title_by_id">Search by TMDB TV ID:</label>
                        <input className="form-control" type="number" id="title_by_id" name="title_by_id" onKeyDown={this.setTitleById} placeholder="Use Enter to search..." step="1" min="1" max="99999" />
                    </div>
                    <div className="searchByTitle form-group">
                        <label className="mr-4" htmlFor="search_box">Search by Original or English Title:</label>
                        <input className="form-control" type="text" id="search_box" name="search_box" value={getState.search_query} onChange={(e) => handleSearch(e.target.value, false)} placeholder="Search for a drama or series..." />
                    </div>
                    <div className="resetState">
                        <button className="btn btn-primary btn-sm" type="button" onClick={resetState}><h6>Reset Filters</h6></button>
                    </div>

                    {
                        (this.state.titleById !== "") ? <Redirect to={`/title/${this.state.titleById}`} /> : null
                    }
                </div>
            </div>
        );
    }
}

export default Filters;