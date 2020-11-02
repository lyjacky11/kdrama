import React, { Component } from 'react';

class Filters extends Component {
    render() {
        const { changeSortBy, changeYear } = this.props;

        return (
            <div className="filters m-3">
                <br />
                <div className="sortFilter">
                    {/* <label className="mr-4" htmlFor="sort_by"> Sort By:</label>
                    <select name="sort_by" id="sort_by" onChange={changeSortBy}>
                        <option value="popularity.desc">Popularity (Desc)</option>
                        <option value="popularity.asc">Popularity (Asc)</option>

                        <option value="vote_average.desc">Rating (Desc)</option>
                        <option value="vote_average.asc">Rating (Asc)</option>

                        <option value="first_air_date.desc">Air Date (Desc)</option>
                        <option value="first_air_date.asc">Air Date (Asc)</option>
                    </select> */}
                    <form onChange={changeSortBy}>
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
                    </form> 
                </div>
                <br />
                <div className="yearFilter">
                    <label className="mr-4" htmlFor="year"><h5>Year:</h5></label>
                    <input type="number" id="year" name="year" onChange={changeYear} placeholder="ex. 2020" step="1" min="1900" max="2100"></input>
                </div>
            </div>

        );
    }
}

export default Filters;