// To-do:   limit start and end date by available data
//          add buy stock option
//          limit data from axios call first

import React, { useEffect, useState } from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
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

  const endDate = searchState
    ? new Date(searchState.data[searchState.data.length - 1].date_)
    : null;

  const startDates = {
    oneDay: new Date(endDate),
    fiveDay: new Date(endDate),
    oneMonth: new Date(endDate),
    sixMonth: new Date(endDate),
    YTD: new Date(endDate),
    oneYear: new Date(endDate),
    fiveYear: new Date(endDate),
  };
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

  function SearchResult() {
    if (searchState != null) {
      return (
        <>
          <Tabs
            defaultActiveKey="1day"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="1day" title="1 Day">
              <CandleStickChart
                data={searchState.data}
                name={searchState.data[0].co_name}
                endDate={endDate}
                startDate={startDates.oneDay.setDate(endDate.getDate() - 1)}
              />
            </Tab>
            <Tab eventKey="5days" title="5 Days">
              <CandleStickChart
                data={searchState.data}
                name={searchState.data[0].co_name}
                endDate={endDate}
                startDate={startDates.fiveDay.setDate(endDate.getDate() - 5)}
              />
            </Tab>
            <Tab eventKey="1month" title="1 Month">
              <CandleStickChart
                data={searchState.data}
                name={searchState.data[0].co_name}
                endDate={endDate}
                startDate={startDates.oneMonth.setMonth(endDate.getMonth() - 1)}
              />
            </Tab>
            <Tab eventKey="6months" title="6 Months">
              <CandleStickChart
                data={searchState.data}
                name={searchState.data[0].co_name}
                endDate={endDate}
                startDate={startDates.sixMonth.setMonth(endDate.getMonth() - 6)}
              />
            </Tab>
            <Tab eventKey="ytd" title="YTD">
              ... in progress
              {/* <CandleStickChart
                data={searchState.data}
                name={searchState.data[0].co_name}
                endDate={endDate}
                startDate={startDates.YTD.setDate(1)}
              /> */}
            </Tab>
            <Tab eventKey="1year" title="1 Year">
              <CandleStickChart
                data={searchState.data}
                name={searchState.data[0].co_name}
                endDate={endDate}
                startDate={startDates.oneYear.setFullYear(
                  endDate.getFullYear() - 1
                )}
              />
            </Tab>
            <Tab eventKey="5years" title="5 Years">
              <CandleStickChart
                data={searchState.data}
                name={searchState.data[0].co_name}
                endDate={endDate}
                startDate={startDates.oneYear.setFullYear(
                  endDate.getFullYear() - 5
                )}
              />
            </Tab>
          </Tabs>
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
