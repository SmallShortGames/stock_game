// To-do:   limit start and end date by available data
//          add buy stock option
//          limit data from axios call first

import React, { useEffect, useState } from "react";
import CandleStickChart from "../../components/CandleStickChart";

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
  const [selectState, setSelectState] = useState("");
  const [searchState, setSearchState] = useState(null);
  const [dateState, setDateState] = useState({
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    API.getStockTickers().then((response) => {
      setTickerState({ ...response.data, isLoaded: true });
    });
  }, []);

  function handleSearchSubmit(event) {
    event.preventDefault();

    API.getStockData(selectState)
      .then((response) => {
        setSearchState(response.data);
      })
      .catch((err) => console.log(err));
  }

  function handleSelectChange(event) {
    let { value } = event.target;
    setSelectState(value);
  }

  function handleDateChange(event) {
    const { name, value } = event.target;
    setDateState({ ...dateState, [name]: value });
  }

  function SearchResult() {
    if (searchState != null) {
      return (
        <>
          <CandleStickChart
            data={searchState.data}
            name={searchState.data[0].co_name}
            start_date={dateState.start_date}
            end_date={dateState.end_date}
          />
        </>
      );
    } else {
      return null;
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
                  <option>-</option>
                  {tickerState.data.map((company) => {
                    return (
                      <option value={company.ticker} key={company.id}>
                        {company.co_name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label htmlFor="start_date">
                Start date:{" "}
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  onChange={handleDateChange}
                />
              </label>
              <label htmlFor="end_date">
                End date:{" "}
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  onChange={handleDateChange}
                />
              </label>
              <input type="submit" value="Search" />
            </form>
            <SearchResult />
          </div>
        </div>
      </>
    );
  } else {
    return "...loading";
  }
}
