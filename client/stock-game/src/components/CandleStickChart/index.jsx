import Chart from "react-apexcharts";
import "./style.css";

export default function CandleStickChart(props) {
  // Prepare company data for ApexCharts
  const seriesdata = [
    {
      data: props.data.map((datum) => {
        return {
          x: new Date(datum.date_),
          y: [datum.daily_open, datum.high, datum.low, datum.daily_close],
        };
      }),
    },
  ];

  const options = {
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  return <Chart options={options} series={seriesdata} type="candlestick" />;
}
