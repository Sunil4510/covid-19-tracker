import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import 'chartjs-adapter-moment';



function LineGraph({ casesType}) {

  const [data, setData] = useState({});
  const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
   // console.log(data)
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };
  
  let options = {
    plugins:{  
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem) {
          return numeral(data[tooltipItem.dataIndex].y).format("+0,0");
        },
      },
    },
  },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    scales: { 
      xAxis:{
          type:"time",
          time:{
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
      },
      yAxes: {
        grid: {
          display: false,
        },
       beginAtZero:true,
        ticks: {
          color:"black",
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    },
  };
  
  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  return (
    <div className="app_graph">
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                fill: 'origin',
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],   
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;