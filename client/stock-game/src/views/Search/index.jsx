// To-do:  add buy stock option

import React, { useEffect, useState } from "react";
import SearchResult from "../SearchResult";
import API from "../../utils/API";
import "./style.css";

export default function Search() {
  const [tickerState, setTickerState] = useState({
    data: [
      {
        co_name: "",
        id: 0,
        sector: "",
        ticker: "",
      },
    ],
    message: "",
    isLoaded: false,
  });
  const [selectState, setSelectState] = useState(null);
  const [searchState, setSearchState] = useState(null);

  useEffect(() => {
    API.getStockTickers().then((response) => {
      setTickerState({ ...response.data, isLoaded: true });
    });
  }, []);

  function handleSearchSubmit(event) {
    event.preventDefault();

    if (selectState) {
      API.getStockData(selectState.ticker)
        .then((response) => {
          setSearchState(response.data);
        })
        .catch((err) => {
          setSearchState(null);
          console.log(err);
        });
    }
  }

  function handleSelectChange(event) {
    let { value } = event.target;
    if (value) {
      setSelectState(JSON.parse(value));
    }
  }

  if (tickerState.isLoaded) {
    return (
      <>
        <div className="search_container">
          <div className="search_heading_container">
            <h3>Search</h3>
          </div>
          <div className="search_body_container">
            <form onSubmit={handleSearchSubmit}>
              <label htmlFor="stock_search_query">
                Company:
                <select name="stock_search_query" onChange={handleSelectChange}>
                  <option value="">-</option>
                  {tickerState.data.map((company) => {
                    return (
                      <option value={JSON.stringify(company)} key={company.id}>
                        {company.co_name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <input type="submit" value="Search" />
            </form>
            {searchState ? (
              <SearchResult data={searchState} titleData={selectState} />
            ) : null}
          </div>
        </div>
      </>
    );
  } else {
    return "...loading";
  }
}
