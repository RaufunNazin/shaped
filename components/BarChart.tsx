"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarProps {
  data: any;
  indexAxis: "x" | "y" | undefined;
  height?: string;
  width?: string;
  title?: string;
  borderRadius?: number;
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  legend?: boolean;
  gridX?: boolean;
  gridY?: boolean;
  borderX?: boolean;
  borderY?: boolean;
}

const VerticalBarChart = ({
  data,
  indexAxis,
  height,
  width,
  title,
  borderRadius,
  responsive,
  maintainAspectRatio,
  legend,
  gridX,
  gridY,
  borderX,
  borderY,
}: BarProps) => {
  return (
    <div
      style={{
        width: width ? width : "600px",
        height: height ? height : "400px",
      }}
    >
      <Bar
        data={data}
        options={{
          indexAxis: indexAxis,
          elements: {
            bar: {
              borderWidth: 0,
              borderRadius: borderRadius ? borderRadius : 4,
            },
          },
          responsive: !responsive ? responsive : true,
          maintainAspectRatio: !maintainAspectRatio
            ? maintainAspectRatio
            : true,
          plugins: {
            legend: {
              display: !legend ? legend : true,
            },
            title: {
              display: !title ? true : false,
              text: title && title,
            },
          },
          scales: {
            x: {
              grid: {
                display: !gridX ? gridX : true,
              },
              border: {
                display: !borderX ? borderX : true,
              },
            },
            y: {
              grid: {
                display: !gridY ? gridY : true,
              },
              border: {
                display: !borderY ? borderY : true,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default VerticalBarChart;
