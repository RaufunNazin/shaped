"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import moment, { Moment } from "moment";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface EmbeddingChartProps {
  embeddings: { name: string | number; data: [number, number][] }[];
  dataType: string;
}
const Embedding2DPlot = ({ embeddings, dataType }: EmbeddingChartProps) => {
  const [min, max] = useMemo(() => {
    const values = embeddings.map((e) => e.name);
    if (dataType == "Numerical") {
      return [
        Math.min(...(values as number[])),
        Math.max(...(values as number[])),
      ];
    } else if (dataType == "Timestamp") {
      const dates = values.map((dateString) => moment(dateString));
      return [moment.min(dates), moment.max(dates)];
    } else return [undefined, undefined];
  }, [embeddings, dataType]);

  const getColor = (value: number | string): string => {
    let normalizedValue;
    if (dataType == "Timestamp") {
      normalizedValue =
        ((moment(value).diff(min) as number) - 0) /
        ((max as Moment).diff(min as Moment) - 0);
    } else {
      normalizedValue =
        ((value as number) - (min as number)) /
        ((max as number) - (min as number));
    }

    const redChannel = Math.round(255 - normalizedValue * 255);
    return `rgba(${redChannel},0, 0, 0.8)`;
  };

  const options: any = {
    chart: {
      type: "scatter",
      toolbar: {
        show: false,
      },
      parentHeightOffset: 0,
      zoom: {
        enabled: false,
      },
    },
    markers: {
      size: 3,
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
      show:
        !["Numerical", "Timestamp"].includes(dataType) &&
        embeddings.length <= 20,
      position: "right",
      offsetY: 30,
      offsetX: -40,
    },
    tooltip: {
      enabled: true,
      custom: ({ seriesIndex, dataPointIndex, w }: any) => {
        const attributeValue = w.globals.initialSeries[seriesIndex].name;
        const data = w.globals.initialSeries[seriesIndex].data;
        const xValue = ["Numerical", "Timestamp"].includes(dataType)
          ? data[dataPointIndex].x
          : data[dataPointIndex][0];
        const yValue = ["Numerical", "Timestamp"].includes(dataType)
          ? data[dataPointIndex].y
          : data[dataPointIndex][0];

        return attributeValue != "undefined"
          ? `
        <div style="padding: 3px 6px;">Attribute value: <span style="font-weight: bold;">${attributeValue}</span></div>
        <div style="padding: 3px 6px;">Embedding: <span style="font-weight: bold;">${xValue}, ${yValue}</span></div>
         `
          : `<div style="padding: 3px 6px;">Embedding: <span style="font-weight: bold;">${xValue}, ${yValue}</span></div>`;
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={
          ["Numerical", "Timestamp"].includes(dataType)
            ? (embeddings.map((e) => ({
                ...e,
                data: e.data.map((d) => ({
                  x: d[0],
                  y: d[1],
                  fillColor: getColor(e.name),
                })),
              })) as any)
            : embeddings
        }
        type="scatter"
        height={500}
        width={800}
      />
    </div>
  );
};

export default Embedding2DPlot;
