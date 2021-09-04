import { Tab, Tabs } from "react-bootstrap";
import CandleStickChart from "../CandleStickChart";
import { sub, setDayOfYear } from "date-fns";

export default function SearchResult({
  data: { data },
  titleData: { co_name, ticker, sector },
}) {
  function filterByDates(data, startDate) {
    return data.filter((datum) => {
      const currentDate = new Date(datum.date_);
      return currentDate > startDate;
    });
  }

  const endDate = new Date(data[data.length - 1].date_);

  const chartsTabs = [
    {
      title: "1 day",
      key: "1day",
      startDate: sub(endDate, { days: 1 }),
      get data() {
        return filterByDates(data, this.startDate);
      },
    },
    {
      title: "5 day",
      key: "5day",
      startDate: sub(endDate, { days: 5 }),
      get data() {
        return filterByDates(data, this.startDate);
      },
    },
    {
      title: "1 month",
      key: "1month",
      startDate: sub(endDate, { months: 1 }),
      get data() {
        return filterByDates(data, this.startDate);
      },
    },
    {
      title: "6 month",
      key: "6month",
      startDate: sub(endDate, { months: 6 }),
      get data() {
        return filterByDates(data, this.startDate);
      },
    },
    {
      title: "YTD",
      key: "YTD",
      startDate: setDayOfYear(endDate, 1),
      get data() {
        return filterByDates(data, this.startDate);
      },
    },
    {
      title: "1 year",
      key: "1year",
      startDate: sub(endDate, { years: 1 }),
      get data() {
        return filterByDates(data, this.startDate);
      },
    },
    {
      title: "5 year",
      key: "5year",
      startDate: sub(endDate, { years: 5 }),
      get data() {
        return filterByDates(data, this.startDate);
      },
    },
  ];

  return (
    <>
      <h3>Market Summary: {co_name}</h3>
      <p>NASDAQ: {ticker}</p>
      <p>Sector: {sector}</p>
      <p>{data[data.length - 1].daily_close} USD</p>
      <Tabs
        defaultActiveKey={chartsTabs[0].key}
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {chartsTabs.map((tab) => {
          return (
            <Tab title={tab.title} eventKey={tab.key}>
              <CandleStickChart
                data={tab.data}
                name={data[0].co_name}
                endDate={endDate}
                startDate={tab.startDate}
              />
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
}
