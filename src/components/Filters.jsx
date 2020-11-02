import React, { Component } from 'react';

class Filters extends Component {
    render() {
        const { getState, resetState, changeSortBy, changeLang, changeYear } = this.props;

        return (
            <div className="filters">
                <div className="sortFilter mb-2">
                    <label className="mr-4" htmlFor="sort_by"> Sort By:</label>
                    <select name="sort_by" id="sort_by" value={getState.sort_by} onChange={changeSortBy}>
                        <option value="popularity.desc">Popularity (Desc)</option>
                        <option value="popularity.asc">Popularity (Asc)</option>

                        <option value="vote_average.desc">Rating (Desc)</option>
                        <option value="vote_average.asc">Rating (Asc)</option>

                        <option value="first_air_date.desc">Air Date (Desc)</option>
                        <option value="first_air_date.asc">Air Date (Asc)</option>
                    </select>
                    {/* <form onChange={changeSortBy}>
                    <h5>Sort By:</h5>
                    <span className="mr-4">Popularity:</span>
                    <input className="mr-2" type="radio" id="popularity.desc" name="sort_by" value="popularity.desc" />
                    <label className="mr-4" htmlFor="popularity.desc">Descending</label>
                    <input className="mr-2" type="radio" id="popularity.asc" name="sort_by" value="popularity.asc" />
                    <label htmlFor="popularity.asc">Ascending</label>
                    <br />
                    <span className="mr-4">Rating:</span>
                    <input className="mr-2" type="radio" id="vote_average.desc" name="sort_by" value="vote_average.desc" />
                    <label className="mr-4" htmlFor="vote_average.desc">Descending</label>
                    <input className="mr-2" type="radio" id="vote_average.asc" name="sort_by" value="vote_average.asc" />
                    <label htmlFor="vote_average.asc">Ascending</label>
                    <br />
                    <span className="mr-4">Air Date:</span>
                    <input className="mr-2" type="radio" id="first_air_date.desc" name="sort_by" value="first_air_date.desc" />
                    <label className="mr-4" htmlFor="first_air_date.desc">Descending</label>
                    <input className="mr-2" type="radio" id="first_air_date.asc" name="sort_by" value="first_air_date.asc" />
                    <label htmlFor="first_air_date.asc">Ascending</label>
                    </form>  */}
                </div>
                <div className="langFilter mb-2">
                    <label className="mr-4" htmlFor="orig_lang"> Language:</label>
                    <select name="orig_lang" id="orig_lang" value={getState.orig_lang} onChange={changeLang}>
                        <option value="ko">Korean (한국어)</option>
                        <option value="ja">Japanese (日本語)</option>
                        <option value="zh">Mandarin (普通话)</option>
                        <option value="cn">Cantonese (廣州話)</option>
                    </select>
                </div>
                <div className="yearFilter mb-2">
                    <label className="mr-4" htmlFor="year">Filter By Year:</label>
                    <input type="number" id="year" name="year" value={getState.air_date_year} onChange={changeYear} placeholder="YYYY" step="1" min="1980" max="2100"></input>
                </div>
                <div className="resetState mb-2">
                    <button onClick={resetState}><h6>Reset Filters</h6></button>
                </div>
            </div>

        );
    }
}

export default Filters;