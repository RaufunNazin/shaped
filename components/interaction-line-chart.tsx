import React from "react";
import AreaChart from "./graphs/area-chart";
import { StackedChart, StackedChartWrapper } from "./graphs/stacked-chart";

interface AreaProps {
  title: string;
  data: { name: string; data: { x: string; y: number }[] }[];
  chartType: "line" | "area";
  subtitle?: string;
  percentiles: number[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const InteractionLineChart = ({
  title,
  data,
  chartType,
  subtitle,
  percentiles,
  width,
  height,
}: AreaProps) => {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="my-2 bg-white text-xl font-bold text-black">{title}</p>
          <p className="text-sm text-gray-500">{subtitle ?? ""}</p>
        </div>
        <div className="flex rounded-lg border">
          <div className="border-r py-1 pl-3 pr-7">
            <div className="text-gray-500">
              {chartType === "line" ? "1st Percentile" : "Bottom 20%"}
            </div>
            <div className="text-xl font-bold">{percentiles[0]}</div>
          </div>
          <div className="border-r py-1 pl-3 pr-7">
            <div className="text-gray-500">
              {chartType === "line" ? "25th Percentile" : "20-40%"}
            </div>
            <div className="text-xl font-bold">{percentiles[1]}</div>
          </div>
          <div className="border-r py-1 pl-3 pr-7">
            <div className="text-gray-500">
              {chartType === "line" ? "50th Percentile" : "40-60%"}
            </div>
            <div className="text-xl font-bold">{percentiles[2]}</div>
          </div>
          <div className="border-r py-1 pl-3 pr-7">
            <div className="text-gray-500">
              {chartType === "line" ? "75th Percentile" : "60-80%"}
            </div>
            <div className="text-xl font-bold">{percentiles[3]}</div>
          </div>
          <div className="py-1 pl-3 pr-7">
            <div className="text-gray-500">
              {chartType === "line" ? "99th Percentile" : "80-100%"}
            </div>
            <div className="text-xl font-bold">{percentiles[4]}</div>
          </div>
        </div>
      </div>
      <StackedChartWrapper
        data={data}
        chartType={chartType}
        height={height}
        width={width}
      />
    </div>
  );
};

export default InteractionLineChart;
