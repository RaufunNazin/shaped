// "use client"
// import React from "react"

// import Plot from "react-plotly.js"

// const Embedding2DPlot = ({ data }: { data: any }) => {
//   const embdeddingsData = [
//     {
//       type: "scatter",
//       mode: "markers",
//       x: data.map((d) => d[0]),
//       y: data.map((d) => d[1]),
//       text: [`Group 1`], // Text label for each group
//       marker: { size: 5 },
//       name: `Group 1`,
//     },
//   ]

//   const layout = {
//     xaxis: {
//       showgrid: false,
//       zeroline: false,
//       title: "",
//       showticklabels: false,
//     },
//     yaxis: {
//       showgrid: false,
//       zeroline: false,
//       title: "",
//       showticklabels: false,
//     },
//     showlegend: false,
//   }

//   const config = {
//     displayModeBar: false,
//   }

//   return <Plot data={embdeddingsData} layout={layout} config={config} />
// }

// export default Embedding2DPlot

"use client";
interface EmbeddingChartProps {
  data: [number, number][];
}

import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Embedding2DPlot = ({ data }: EmbeddingChartProps) => {
  data = [
    [1, 2],
    [2, 3],
    [5, 9],
    [10, 11],
    [2, 30],
    [8, 20],
    [20, 7],
    [21, 3],
  ];
  const values = [2, 40, 6, 300, 50, 90, 160, 10];
  function getColor(value: number): string {
    // Implement your logic to map numerical values to colors
    // For simplicity, I'm using a linear scale from light to dark blue
    const min = Math.min(...values);
    const max = Math.max(...values);
    const normalizedValue = (value - min) / (max - min);
    const blueChannel = Math.round(255 - normalizedValue * 255);
    return `rgba(${blueChannel},0, 0, 0.8)`;
  }

  const options = {
    chart: {
      height: 20,
      type: "scatter",
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 5,
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      custom: ({ seriesIndex, dataPointIndex, w }: any) => {
        const data = w.globals.initialSeries[seriesIndex].data;
        console.log(w.globals.initialSeries);
        const xValue = data[dataPointIndex][0];
        const yValue = data[dataPointIndex][1];
        return `<div style="padding: 6px;">${xValue}, ${yValue}</div>`;
      },
    },
  };
  const generateColor = (value: number) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const percent = (value - min) / (max - min);
    const hue = percent * 120; // You can adjust this value for a different color scale
    return `hsl(${hue}, 100%, 50%)`;
  };

  const colors = values.map((value) => getColor(value));
  const series = [
    {
      name: "",
      data: data.map((point, index) => ({
        x: point[0],
        y: point[1],
        // fillColor: colors[index],
      })),
    },
  ];

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="scatter"
        height={350}
      />
    </div>
  );
};

export default Embedding2DPlot;
